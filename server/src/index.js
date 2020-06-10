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
  socket.on("new-operations", (data) => {
    const { to: groupId, value } = data;
    const callback = (err, doc) => {
      if (err) console.log(err);
      if (doc) {
        doc.value = value;
        doc.save();
        io.emit(`remote-operations-to-${groupId}`, data);
      }
    };
    if (groupId === "public") {
      Doc.findOne({ author: "public" }, callback);
    } else {
      Doc.findById(groupId, callback);
    }
  });
});

server.listen(4000, () => {
  console.log("listening on *:4000");
});
