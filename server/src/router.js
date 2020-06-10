const router = require("express").Router();
const Doc = require("./model");

const initialValue = {
  author: "public",
  value: {
    document: {
      nodes: [
        {
          object: "block",
          type: "paragraph",
          nodes: [
            {
              object: "text",
              text: "欢迎来到群组，你可以xxxx。",
            },
          ],
        },
      ],
    },
  },
};

router.get("/groups/public", (_req, res) => {
  Doc.findOne({ author: "public" }, (err, doc) => {
    if (err) console.log(err);
    if (!doc) {
      doc = new Doc(initialValue);
      doc.save();
    }
    res.json(doc);
  });
});

router.get("/groups/:id", (req, res) => {
  const { id } = req.params;
  Doc.findById(id, (err, doc) => {
    if (err) console.log(err);
    if (!doc) {
      res.status(404).json({
        reason: "Not Found.",
      });
    }
    res.json(doc);
  });
});

module.exports = router;
