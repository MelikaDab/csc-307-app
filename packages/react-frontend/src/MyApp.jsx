import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);
  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => {
        setCharacters(json["users_list"]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function removeOneCharacter(userId) {
    console.log(userId);
    const url = `http://localhost:8000/users/${userId}`;
    fetch(url, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.status === 204) {
          const updated = characters.filter(
            (character) => character.id !== userId
          );
          setCharacters(updated);
        } else {
          console.log("Failed to delete user");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function updateList(person) {
    postUser(person)
      .then(async (res) => {
        if (res.status === 201) {
          const newCharacter = await res.json();
          setCharacters([...characters, newCharacter]);
        } else {
          console.log("Create unsuccessful");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  function postUser(person) {
    const promise = fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );
}

// make component available for import by other files
export default MyApp;
