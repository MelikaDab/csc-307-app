import mongoose from "mongoose";
import userModel from "./user.js";

mongoose.set("debug", true);

const url = process.env.MONGO_URI;

mongoose
  .connect("mongodb+srv://jalehdabiri:CarSeatHeadrest1380@cluster0.swmzsaa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    dbName:"users"
  })
  .catch((error) => console.log(error));


function getUsers(name, job) {
  let promise;
  if (name === undefined && job === undefined) {
    promise = userModel.find();
  } else if (name && !job) {
    promise = findUserByName(name);
  } else if (job && !name) {
    promise = findUserByJob(job);
  } else if (job && name) {
    promise = findUserByNameAndJob(name, job)
  }
  return promise;
}

function findUserById(id) {
  return userModel.findById(id);
}

function addUser(user) {
  const userToAdd = new userModel(user);
  const promise = userToAdd.save();
  return promise;
}

function deleteUser(id) {
  return userModel.findByIdAndDelete(id)
}

function findUserByName(name) {
  return userModel.find({ name: name });
}

function findUserByJob(job) {
  return userModel.find({ job: job });
}

function findUserByNameAndJob(name, job) {
  return userModel.find({ job: job, name: name})
}

export {
  addUser,
  getUsers,
  deleteUser,
  findUserById
};