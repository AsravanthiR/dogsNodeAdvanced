"use strict";

const http = require("http");
const path = require("path");
const cors = require("cors");

const express = require("express");

const app = express();

const { port, host } = require("./config/config.json");

const Datastorage = require(path.join(
  __dirname,
  "storage",
  "dataAccessLayer.js"
));

const storage = new Datastorage();

const server = http.createServer(app);

app.use(cors());
app.use(express.json());

app.get("/api/dog", (req, res) =>
  storage
    .getAll()
    .then((result) => res.json(result))
    .catch((err) => res.json(err))
);

app.get("/api/dog/:number", (req, res) =>
  storage
    .getOne(req.params.number)
    .then((result) => res.json(result))
    .catch((err) => res.json(err))
);

app.post("/api/dog", (req, res) => {
  const dog = req.body;
  storage
    .insert(dog)
    .then((status) => res.json(status))
    .catch((err) => res.json(err));
});

app.put("/api/dog/:number", (req, res) => {
  const dog = req.body;
  const number = req.params.number;
  storage
    .update(number, dog)
    .then((status) => res.json(status))
    .catch((err) => res.json(err));
});

app.delete("/api/dog/:number", (req, res) =>
  storage
    .remove(req.params.number)
    .then((result) => res.json(result))
    .catch((err) => res.json(err))
);

app.all("*", (req, res) => res.json("Wrong entry. Try /api/dogs. "));

server.listen(port, host, () =>
  console.log(`Server ${host}:${port} available.`)
);
