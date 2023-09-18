const express = require("express");
const serverless = require("serverless-http");
const fs = require("fs").promises;
const path = require("path");

const app = express();
const router = express.Router();

app.use(express.json());
app.use(`/`, router);

router.get("/events/:id", async (req, res) => {
  const eventId = parseInt(req.params.id);

  try {
    const data = await fs.readFile(path.join(__dirname, "db.json"), "utf8");
    const jsonData = JSON.parse(data);
    const event = jsonData.events.find((event) => event.id === eventId);

    if (!event) {
      res.status(404).json({ message: "Event not found" });
    } else {
      res.json(event);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/events", async (req, res) => {
  try {
    const data = await fs.readFile(path.join(__dirname, "db.json"), "utf8");
    const jsonData = JSON.parse(data);
    res.json(jsonData.events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = app;
module.exports.handler = serverless(app);
