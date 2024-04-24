import express from "express";
import cors from "cors";
//import {  addUser, getUsers, findUserById, findUserByName, findUserByJob } from "./models/user-services"

const app = express();
const port = 8000;

app.use(cors());
// set up our express app to process incoming data in json format
app.use(express.json());

let users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor",
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer",
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor",
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress",
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender",
    },
  ],
};

// helper functions
const findUserById = (id) => {
  return users["users_list"].find((user) => user["id"] === id);
};
const findUserByName = (name) => {
  return users["users_list"].filter((user) => user["name"] === name);
};

const generateID = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < 8; i++) {
    id += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return id;
};

const addUser = (user) => {
  //let id =  Math.floor(10000 + Math.random() * 90000);
  let id;
  let isUniqueId = false;

  while (!isUniqueId) {
    id = generateID();
    // Check if the generated ID already exists in the users_list
    if (!users["users_list"].some((user) => user.id === id)) {
      isUniqueId = true;
    }
  }

  user.id = id;
  users["users_list"].push(user);
  console.log(users);
  return user;
};

const deleteUser = (user) => {
  users["users_list"] = users["users_list"].filter((item) => item !== user);
  return users["users_list"];
};

const findUserByNameAndJob = (name, job) => {
  return users["users_list"].filter(
    (item) => item["job"] === job && item["name"] === name
  );
};

// routes

// root
app.get("/", (req, res) => {
  res.send("hello world!");
});

// get user by name and job or either
app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  if (!name && !job) {
    return res.send(users["users_list"]);
  }
  let results = [];

  if (name && job) {
    results = findUserByNameAndJob(name, job);
  } else if (name) {
    results = findUserByName(name);
  } else if (job) {
    results = findUserByJob(job);
  }

  if (results.length === 0) {
    return res.status(404).send("No users found with the specified criteria.");
  }

  results = { users_list: results };
  res.send(results);
});

// get user by id
app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

// add a user
app.post("/users", (req, res) => {
  const userToAdd = req.body;
  let result = addUser(userToAdd);
  if (result === undefined) {
    res.status(400).send("Bad request.");
  } else {
    res.status(201).send(result);
  }
});

// delete a user by id
app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.status(204).send(deleteUser(result));
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
