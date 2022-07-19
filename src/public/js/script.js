import AuthCtrl from "../../controllers/auth.controller";
const socket = io("http://localhost:3000");
const login = document.getElementById('login');
const username = document.getElementById('username');
const send = document.getElementById('send');
const cvName = document.getElementById('cvName');
let modal = document.getElementById('modal');
let cvEmail = document.getElementById('cvEmail');


let notice = [];


if (send){
    send.addEventListener('submit', e => {
        let news = {
            mess: cvName.value + ' sent an apply',
            cvEmail: cvEmail.value
        }
        socket.emit('sendCV', news);
        console.log[notice];
    })
}

function notices(){
    for (let i = 0; i < notice.length; i++) {
        modal.innerHTML += `<div id="notice${i}">
                                <p>${notice[i].mess}
                                <a href="/cv/accept/${notice[i].cvEmail}" style="text-decoration: none;
                                 color: black; float: right; height: 20px; padding-left: 10px; padding-right: 10px;">Accept
                                </a>
                                <button type="button" onclick="deleteNotice(${i})" style="text-decoration: none;
                                 color: black; float: right; margin-left: 15px; margin-right: 15px; height: auto;
                                 padding-left: 10px; padding-right: 10px;">Delete
                                </button>
                                </p>
                            </div>`
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

function deleteNotice(index){
    let note = document.getElementById(`notice${index}`).innerHTML;
    notice.splice(index, 1);
    modal.innerHTML -= note;
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
