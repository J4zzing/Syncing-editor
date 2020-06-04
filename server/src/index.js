const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const cors = require("cors");

const initialValue = {
  document: {
    nodes: [
      {
        object: "block",
        type: "paragraph",
        nodes: [
          {
            object: "text",
            text: "你现在正处于一个组群当中。",
          },
        ],
      },
    ],
  },
};
let groupsValue = {};

io.on("connection", (socket) => {
  socket.on("new-operations", (data) => {
    // console.log(data);
    const { from: editorId, to: groupId, value } = data;
    groupsValue[groupId] = value;
    io.emit(`remote-operations-to-${groupId}`, data);
  });
});

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.get("/groups/:id", (req, res) => {
  const { id } = req.params;
  if (!(id in groupsValue)) {
    groupsValue[id] = initialValue;
  }
  res.json(groupsValue[id]);
});

server.listen(4000, () => {
  console.log("listening on *:4000");
});
