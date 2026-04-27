const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);

// 🔥 CHANGE: allow all origins for deployment
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] }
});

// 🔥 OPTIONAL (but useful): test route
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("send_message", (data) => {
    io.emit("receive_message", data); // sab logo ko bhejo
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// 🔥 CHANGE: dynamic port for Render
const PORT = process.env.PORT || 4000;

server.listen(PORT, () => console.log("Server running on port " + PORT));