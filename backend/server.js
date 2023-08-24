const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});
let users = [];

io.on("connection", (socket) => {
  socket.on("message", (data) => {
    console.log(data);
    io.emit("messageResponse", data);
  });
  socket.on("newUser", (data) => {
    users.push(data);
    io.emit("newUserResponse", users);
  });
  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
    //Updates the list of users when a user disconnects from the server
    users = users.filter((user) => user.socketID !== socket.id);
    // console.log(users);
    //Sends the list of users to the client
    io.emit("newUserResponse", users);
    socket.disconnect();
  });
  // ...
});

httpServer.listen(5656, () => {
  console.log("listening on port 5656");
});
