const router = require("./router");
const Doc = require("./model");

const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/miniDoc", { useNewUrlParser: true });
const db = mongoose.connection;
db.once("open", () => {
  console.log("database connected succussfully.");
});

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use("/", router);

io.on("connection", (socket) => {
  // editor operations
  socket.on("new-operations", (data) => {
    const { to: docId, value } = data;
    Doc.findById(docId, (err, doc) => {
      if (err) console.log(err);
      if (doc) {
        io.emit(`remote-operations-to-${docId}`, data);
        doc.value = value;
        doc.save();
      }
    });
  });

  // chat messages
  socket.on("new-message", (data) => {
    const { to: docId, ...msg } = data;
    io.emit(`remote-message-to-${docId}`, msg);
  });
});

server.listen(4000, () => {
  console.log("listening on *:4000");
});
