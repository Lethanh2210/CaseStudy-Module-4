import {Server} from "socket.io";

class Socket{
    io: any;
    constructor(httpServer: any){
        this.io = new Server(httpServer);
    }

    async connectSocket(){
        await this.io.on('connect', socket)
    }
}