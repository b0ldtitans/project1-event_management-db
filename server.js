const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");
const serverless = require("serverless-http");

app.use(express.json());

app.get("/events/:id", (req, res) => {
  const eventId = parseInt(req.params.id);

  fs.readFile("db.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
      return;
    }

    const jsonData = JSON.parse(data);
    const event = jsonData.events.find((event) => event.id === eventId);

    if (!event) {
      res.status(404).json({ message: "Event not found" });
    } else {
      res.json(event);
    }
  });
});

// Define routes to get various parts of the JSON data
app.get("/events", (req, res) => {
  fs.readFile("db.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
      return;
    }

    const jsonData = JSON.parse(data);
    res.json(jsonData.events);
  });
});

app.get("/users", (req, res) => {
  fs.readFile("db.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
      return;
    }

    const jsonData = JSON.parse(data);
    res.json(jsonData.users);
  });
});

app.get("/referral_codes", (req, res) => {
  fs.readFile("db.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
      return;
    }

    const jsonData = JSON.parse(data);
    res.json(jsonData.referral_codes);
  });
});

app.get("/coupons", (req, res) => {
  fs.readFile("db.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
      return;
    }

    const jsonData = JSON.parse(data);
    res.json(jsonData.coupons);
  });
});

app.get("/organizer", (req, res) => {
  fs.readFile("db.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
      return;
    }

    const jsonData = JSON.parse(data);
    res.json(jsonData.organizer);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports.handler = serverless(app);
