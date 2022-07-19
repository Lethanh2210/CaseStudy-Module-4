class UserSocket{
    users: any[] = [];
    constructor(){
        this.users = []
    }

    userJoin(id: any, username: string, room: string) {
        const user = {id, username, room}
        this.users.push(user);
        return user;
    }

    getCurrentUser(username){
        return this.users.find(user => user.username === username);
    }
}

export default UserSocket;





