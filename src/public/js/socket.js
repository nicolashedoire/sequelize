const socket = io.connect("http://localhost:5000");
socket.on("connect", function (data) {
  socket.emit("join", "Hello World from client");
});
