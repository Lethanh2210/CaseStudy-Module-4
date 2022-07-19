const socket = io("http://localhost:3000");
const login = document.getElementById('login');
const username = document.getElementById('username');
const send = document.getElementById('send');
const cvName = document.getElementById('cvName');
let modal = document.getElementById('modal');
let notice = [];


if (send){
    send.addEventListener('submit', e => {
        e.preventDefault();
        let news = cvName.value;
        socket.emit('sendCV', news);
        console.log[notice];
    })
}

function notices(){
    for (let i = 0; i < notice.length; i++) {
        modal.innerHTML += `<div><p>${notice[i]}</p></div>`
    }
}

function closeModal() {
    modal.innerHTML = '';
    const notificationBtn = document.getElementById("notification-btn");

    //   To set the value of the data attribute
    notificationBtn.setAttribute(
        "data-notification-count",
        `${0}`
    );
}

socket.on('notice', (news) => {
    notice.unshift(news);
    const notificationBtn = document.getElementById("notification-btn");
    let notificationCount = parseInt(
        notificationBtn.getAttribute("data-notification-count")
    );
    //   To set the value of the data attribute
    notificationBtn.setAttribute(
        "data-notification-count",
        `${++notificationCount}`
    );
})
