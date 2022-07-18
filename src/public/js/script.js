const socket = io();
const login = document.getElementById('login');
const username = document.getElementById('username');
const send = document.getElementById('send');
const cvName = document.getElementById('cvName');

login.addEventListener('submit', e => {
    e.preventDefault();
    const user = username.value;
    socket.emit('login', user);
})

send.addEventListener('submit', e => {
    e.preventDefault();
    const news = cvName.value;
    socket.emit('send', news);
})

socket.on('notice', news => {
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
