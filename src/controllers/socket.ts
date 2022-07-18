import {Server} from "socket.io";

class Socket{
    io: any;
    socket: any;
    users: any;

    constructor(){
        this.io = new Server({
            cors: {
                origin: "https://localhost:3000"
            }
        });
    }

    connectSocket(){
        return new Promise((resolve, reject) => {
            this.io.on('connect', (socket) => {
                    console.log("io connected");
                    resolve(socket);
            })
        })
    }

    login(socket){
        socket.on('login', (name) => {
            this.users[socket.id] = name;
        })
    }

    apply(socket){
       socket.on('apply', (id) => {
           socket.emit('receiveApply', {name: this.users[socket.id]})
       })
    }

    send(socket){
        socket.on('send', (news) => {
            socket.emit('notice', news);
        })
    }

}

export default Socket;