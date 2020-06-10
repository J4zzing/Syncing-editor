const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Mark = new Schema({
  object: {
    type: String,
    default: "mark",
  },
  type: String,
});

const Node = new Schema({
  object: String,
  type: String,
  marks: [Mark],
  text: String,
});
Node.add({
  nodes: [Node],
});

const Doc = new Schema({
  author: String,
  object: {
    type: String,
    default: "value",
  },
  value: {
    document: {
      nodes: [Node],
    },
  },
});

module.exports = mongoose.model("Doc", Doc);
