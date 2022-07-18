const socket = io();
const login = document.getElementById('login');
const username = document.getElementById('username');
const send = document.getElementById('send-button');
const cvName = document.getElementById('cvName');


send.addEventListener('click', e => {
    console.log("sent");
    e.preventDefault();
    const news = cvName.value;
    socket.emit('sendCV', news);
})

socket.on('notice', news => {
    console.log('received');
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
