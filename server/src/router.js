const router = require("express").Router();
const Doc = require("./model");

const defaultValue = {
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
              text: "",
            },
          ],
        },
      ],
    },
  },
  initializer: "",
};

router
  .route("/docs/")
  .get((req, res) => {
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
  .put((req, res) => {
    const { id } = req.params;
    if (!id) {
      const doc = new Doc(defaultValue);
      doc.save();
      res.json(doc);
    }
  });

router.get("/docs/:id", (req, res) => {
  const { id } = req.params;
  Doc.findById(id, (err, doc) => {
    if (err) throw new Error(err);
    if (!doc) {
      res.status(404).json({
        error: {
          reason: "Doc not found.",
        },
      });
    }
    res.json(doc);
  });
});

module.exports = router;
