const io = require("socket.io")(3000, { cors: { origin: "*" } });

io.on("connection", (socket) => {
    console.log("user connected");
    socket.on("send-chat-message", (data) => {
        socket.broadcast.emit("chat-message", data);
    })
});
