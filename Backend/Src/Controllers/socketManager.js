import { constants } from "node:buffer";
import { Socket } from "node:dgram";
import path from "node:path";
import { Server } from "socket.io"

let connections = {};
let message = {};
let timeOnline = {};

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

        Socket.on("join_call", (path) => {
            if(connections[path] === undefined){
                connections[path] = [];
            }
            connections[path].push(Socket.id);

            timeOnline[Socket.id] = new Date();

            // connections[path].forEach(element => {
            //     io.to(element);
            // });

            for(let a=0; a<connections[path].length; a++){
                io.to(connections[path][a]).emit("user-joined", Socket.id, connections[path]);
            };

            if(connections[path] !== undefined){
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
                if (messages[matchingRoom] === undefined) {
                    messages[matchingRoom] = []
                }

                messages[matchingRoom].push({ 'sender': sender, "data": data, "socket-id-sender": Socket.id })
                console.log("message", matchingRoom, ":", sender, data)

                connections[matchingRoom].forEach((elem) => {
                    io.to(elem).emit("chat-message", data, sender, Socket.id)
                })
            }


        })


        Socket.on("disconnect", () => {
            var diffTime = Math.abs(timeOnline[socket.id] - new Date())

            var key    //room id

            for (const [room, persons] of JSON.parse(JSON.stringify(Object.entries(connections)))) {  // which room and how many persons in that room

                for (let a = 0; a < persons.length; ++a) {
                    if (persons[a] === socket.id) {   // if person which is disconnecting is equal to current socket id 
                        key = room

                        for (let a = 0; a < connections[key].length; ++a) {
                            io.to(connections[key][a]).emit('user-left', socket.id)    // if line 94 is correct then then emit "user-left" to all other persons in that room and remove that person from the room
                        }

                        var index = connections[key].indexOf(socket.id)

                        connections[key].splice(index, 1)


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

 