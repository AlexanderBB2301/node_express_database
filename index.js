const express = require("express");
const app = express();
app.use(express.json());
const Collections = require("./models/dbhelpers");
const PORT = 5050;

app.get("/", (req, res) => {
  res.json({ note: "WoooHooo" });
});

//POST to add data
app.post("/api/collections", (req, res) => {
  Collections.add(req.body)
    .then((collection) => {
      res.status(200).json(collection);
    })
    .catch((error) => {
      res.status(500).json({ information: "Cannot add this information." });
    });
});
//get specific collection by id
app.get("/api/collections/:id", (req, res) => {
  const { id } = req.params;
  Collections.findById(id)
    .then((collection) => {
      if (collection) {
        res.status(200).json(collection);
      } else {
        res.status(404).json({ note: "Collection not found." });
      }
    })
    .catch((error) => {
      res.status(500).json({ note: "We cannot retreive this item." });
    });
});

//get - retrieve collections
app.get("/api/collections", (req, res) => {
  Collections.find()
    .then((collections) => {
      res.status(200).json(collections);
    })
    .catch((error) => {
      res.status(500).json({ note: "Cannot retreive collections" });
    });
});

//delete
app.delete("/api/collections/:id", (req, res) => {
  const { id } = req.params;
  Collections.remove(id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ note: "Collection/s deleted." });
      } else {
        res.status(404).json({ note: "Unable to find collection." });
      }
    })
    .catch((error) => {
      res.status(500).json({ note: "Unable to delete this collection." });
    });
});

//updating collections
app.patch("/api/collections/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  Collections.update(id, changes)
    .then((collection) => {
      if (collection) {
        res.status(200).json(collection);
      } else {
        res.status(404).json({ note: "Collection not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ note: "Error!" });
    });
});

app.listen(PORT, () => {
  console.log(`\app running on Port ${PORT}`);
});
