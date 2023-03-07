const express = require("express");
const bodyParser = require("body-parser");
const licences_router = require("./routes/licences_router");
const app = express();

app.use(bodyParser.json()); // parse incoming JSON data

app.use((req, res, next) => {
  //middleware to solve CORS error
  res.setHeader('Cache-control','no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  res.setHeader("Access-Control-Allow-Origin", "*"); //allow origins to access my data
  res.setHeader("Access-Control-Allow-Methods", "GET"); //allow origins to use my HTTP methods
  res.setHeader("Access-Control-Allow-Headers", "Content-type, Authorization"); //allow origins to use certain headers
  next(); //the request can now continue
});

app.use("/licences", licences_router); 

app.listen(8080);