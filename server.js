/*
    Author: Robert Hermann
    Date: April 29, 2024
    Description: Codecademy off-platform project to create API for budgeting app
*/
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const PORT = 3000;
const categoryArray = [
  {
    envId: 1,
    envName: "Food-Market",
    envBudget: 350,
  },
  {
    envId: 2,
    envName: "Rent",
    envBudget: 1500,
  },
  {
    envId: 3,
    envName: "Auto-Gas",
    envBudget: 80,
  },
];
let envId = 1;

//parses all incoming request data as JSON, i.e. strings
app.use(bodyParser.json());

//create a new envelope where the envelope name and dollar
//amt are sent in the request body
app.post("/envelopes", (req, res) => {
  const { envName, envBudget } = req.body;
  if (envName === "" || envBudget < 0) {
    res.status(404).send("Invalid request body - no name or budget.");
  }
  const newCategory = { id: envId, name: envName, budget: envBudget };
  envId++;
  categoryArray.push(newCategory);
  res.status(201).json(newCategory);
  console.log(categoryArray);
});

//return all envelope categories created
app.get("/envelopes", (req, res) => {
  if (categoryArray.length > 0) {
    res.status(200).json(categoryArray);
  } else {
    res.status(404).send("No categories created yet.");
  }
});

//return a specific envelope where the envelope ID is
//sent in the query parameter. req.params.envId is read
//as a string, so convert to an integer for endpoint to work
app.get("/envelopes/:envId", (req, res) => {
  let searchId = Number(req.params.envId);
  const found = categoryArray.find((element) => element.envId === searchId);
  if (found) {
    res.status(200).json(found);
  } else {
    res.status(404).send(`Envelope ID: ${searchId} not found.`);
  }
});

app.put("/envelopes/:envId", (req, res) => {
  let searchId = req.params.envId;
  let newBudget = req.body.envBudget;
  let newName = req.body.envName;
  const found = categoryArray.find((element) => element.envId === searchId);
  if (found) {
    if (newBudget !== found.envBudget) {
      found.envBudget = newBudget;
    }
    if (newName !== found.envName) {
      found.envName = newName;
    }
    res.status(200).send("Updates made.");
  } else {
    res.status(404).send(`Envelope ID: ${searchId} not found.`);
  }
});

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
