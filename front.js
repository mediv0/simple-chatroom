// io
const socket = io("http://localhost:3000");

socket.on("chat-message", (data) => {
    const listItem = generateChatComponent(data, "sent");
    renderChatMessage(listItem);
})

// globals
const chatBtn = document.querySelector(".chat_input");
const chatBox = document.querySelector(".chat");

// helpers
function generateChatComponent(data, senderClass) {
    const li = document.createElement("li");
    li.classList.add("message");
    li.classList.add(senderClass);
    li.innerHTML = `
        <p>${data.message}</p>
        <p class="sender">${data.sender}</p>
    `;

    return li;
}

function renderChatMessage(listElement) {
    chatBox.prepend(listElement);
}

// listeners
chatBtn.addEventListener("keyup", (e) => {
    // enter key code
    if (e.keyCode === 13 && e.target.value) {
        console.log("send data");
        const data = {
            message: e.target.value,
            sender: document.getElementById("username").value,
        };
        e.target.value = null;
        socket.emit("send-chat-message", data);
        const listItem = generateChatComponent(data, "me");
        renderChatMessage(listItem);
    }
});
