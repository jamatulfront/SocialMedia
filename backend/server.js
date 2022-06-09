const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { readdirSync } = require("fs");
const app = express();

app.use(express.json());
//dotenv Config
const dotenv = require("dotenv");
dotenv.config();

//Cors Config
const options = {
  origin: "http://localhost:3000",
  optionSuccessStatus: "200",
};
app.use(cors(options));

//Routes Setup
readdirSync(`${__dirname}/routes`).map((route) =>
  app.use("/", require("./routes/" + route))
);

//Database Setup
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Database is connected successfully !");
  })
  .catch((error) => console.log(error));

app.get("/", (req, res) => {
  res.send("welcome from home");
});
app.get("/books", (req, res) => {
  res.send("hahahahahahahhahahaaiidhiagduogauodhguagdigaiduygiuagduagdiu");
});

//Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`The server is running at port ${PORT}...`);
});
