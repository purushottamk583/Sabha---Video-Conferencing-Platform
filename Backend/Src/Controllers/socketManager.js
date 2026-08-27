import { constants } from "node:buffer";
import path from "node:path";
import { Server } from "socket.io"

let connections = {};
let message = {};
let timeOnline = {};
let usernames = {};

export const ConnectToSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            allowedHeaders: ["*"],
            credentials: true
        }
    });

    io.on("connection", (Socket) => {

            Socket.on("join-call", (path, username) => {
            if(connections[path] === undefined){
                connections[path] = [];
            }
            connections[path].push(Socket.id);

            timeOnline[Socket.id] = new Date();
                usernames[Socket.id] = username || "Participant";

            // connections[path].forEach(element => {
            //     io.to(element);
            // });

            for(let a=0; a<connections[path].length; a++){
                io.to(connections[path][a]).emit("user-joined", Socket.id, connections[path], usernames);
            };

            if(message[path] !== undefined){
                for(let a=0; a<message[path].length ; ++a){
                    io.to(Socket.id).emit("chat-message",
                        message[path][a]['data'],
                        message[path][a]['sender'],
                        message[path][a]['socket-id-sender']
                    );
                }
            }
        });


        Socket.on("signal", (toId, message) => {
            io.to(toId).emit("signal", Socket.id, message);
        })


        Socket.on("chat-message", (data, sender) => {
            const [matchingRoom, found] = Object.entries(connections)
                .reduce(([room, isFound], [roomKey, roomValue]) => {
                    if (!isFound && roomValue.includes(Socket.id)) {
                        return [roomKey, true];
                    }
                    return [room, isFound];
                }, ['', false]);

            if (found === true) {
                if (message[matchingRoom] === undefined) {
                    message[matchingRoom] = []
                }

                message[matchingRoom].push({ 'sender': sender, "data": data, "socket-id-sender": Socket.id })
                console.log("message", matchingRoom, ":", sender, data)

                connections[matchingRoom].forEach((elem) => {
                    io.to(elem).emit("chat-message", data, sender, Socket.id)
                })
            }
        })


        Socket.on("disconnect", () => {

            var diffTime = Math.abs(timeOnline[Socket.id] - new Date())

            var key

            for (const [k, v] of JSON.parse(JSON.stringify(Object.entries(connections)))) {

                for (let a = 0; a < v.length; ++a) {
                    if (v[a] === Socket.id) {
                        key = k

                        for (let a = 0; a < connections[key].length; ++a) {
                            io.to(connections[key][a]).emit('user-left', Socket.id)
                        }

                        var index = connections[key].indexOf(Socket.id)

                        connections[key].splice(index, 1)
                        delete usernames[Socket.id]


                        if (connections[key].length === 0) {
                            delete connections[key]
                        }
                    }
                }

            }
        })
    })
    return io;
};

 