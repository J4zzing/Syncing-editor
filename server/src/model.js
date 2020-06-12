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
  data: Object,
  marks: [Mark],
  text: String,
});
Node.add({
  nodes: [Node],
});

const Doc = new Schema({
  object: {
    type: String,
    default: "value",
  },
  value: {
    document: {
      object: {
        type: String,
        default: "document",
      },
      data: Object,
      nodes: [Node],
    },
  },
  group: String,
});

module.exports = mongoose.model("Doc", Doc);
