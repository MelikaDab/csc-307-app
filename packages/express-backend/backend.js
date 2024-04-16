import express from "express";

const app = express();
const port = 8000;

// set up our express app to process incoming data in json format
app.use(express.json());

app.get("/", (req, res) => {
    res.send("hello world!");
})

app.listen(port, () => {
    console.log(
        `Example app listening at http://localhost:${port}`
      );
})