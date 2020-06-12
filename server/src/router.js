const router = require("express").Router();
const Doc = require("./model");

const initialValue = {
  object: "value",
  value: {
    document: {
      object: "document",
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
  group: "public",
};

router
  .get("/groups/", (req, res) => {
    Doc.find({}, "_id group", (err, docs) => {
      if (err) console.log(err);
      if (!docs) {
        res.status(404).json({
          reason: "No docs exist in server.",
        });
      }
      res.json(docs);
    });
  })
  .post("/groups/", (req, res) => {
    const { group } = req.params;
    if (!group) {
      res.status(400).json({
        error: {
          reason: "Not specified group name.",
        },
      });
    }
    const doc = new Doc({ group });
    doc.save();
    res.json(doc);
  });

router.get("/groups/public", (_req, res) => {
  Doc.findOne({ group: "public" }, (err, doc) => {
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
        error: {
          reason: "Not Found.",
        },
      });
    }
    res.json(doc);
  });
});

module.exports = router;
