import express from "express";
import cors from "cors";

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
const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

const findUserByName = (name) => {
  return users["users_list"].filter((user) => user["name"] === name);
};

const addUser = (user) => {
  let id =  Math.floor(10000 + Math.random() * 90000);
  // let id;
  // isUniqueId = false;

  // while (!isUniqueId) {
  //   id =  Math.floor(10000 + Math.random() * 90000);
  //   // Check if the generated ID already exists in the users_list
  //   if (!users_list.some(user => user.id === randomId)) {
  //     isUniqueId = true;
  //   }
  // }

  user.id = id;
  users["users_list"].push(user);
  return user;
};

const deleteUser = (user) => {
  users["users_list"] = users["users_list"].filter(item => item !== user)
  return users["users_list"];
}

const findUserByJobAndName = (job, name) => {
  return users["users_list"].filter(item => item.job === job && item.name === name);
}

// routes
app.get("/", (req, res) => {
  res.send("hello world!");
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  if (name != undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  let result = addUser(userToAdd);
  if (result === undefined) {
    res.status(400).send("Bad request.");
  } else {
    res.status(201).send();
  }
});

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(deleteUser(result));
  }
})


// app.get("/users/namejob", (req, res) => {
//   const {name, job } = req.body;
//   res.send("hello")
//   let result = findUserByJobAndName(job, name);
//   if (result === undefined) {
//     res.status(404).send("Resource not found.");
//   } else {
//     res.send(result);
//   }

// })



app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
