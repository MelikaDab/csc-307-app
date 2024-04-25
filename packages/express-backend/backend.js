import express from "express";
import cors from "cors";
import {
  addUser,
  getUsers,
  findUserById,
  deleteUser,
} from "./models/user-services.js";

const app = express();
const port = 8000;

app.use(cors());
// set up our express app to process incoming data in json format
app.use(express.json());

// routes

// root
app.get("/", (req, res) => {
  res.send("hello world!");
});

// get user by name and job or either
app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  getUsers(name, job)
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.status(404).send({ message: err });
    });
});

// get user by id
app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id

  findUserById(id)
    .then((user) => res.send(user))
    .catch((err) => res.status(404).send(err));
});

// add a user
app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd)
    .then((user) => res.status(201).send(user))
    .catch((err) => res.status(400).send(err));
});

// delete a user by id
app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
  deleteUser(id)
    .then(() => res.status(204).send({"message": "User successfully deleted."}))
    .catch((err) => res.status(404).send(err));
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
