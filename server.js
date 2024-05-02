/*
    Author: Robert Hermann
    Date: April 29, 2024
    Description: Codecademy off-platform project to create API for budgeting app
*/
const express = require("express");
const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
