const express = require("express");
const bodyParser = require("body-parser");
const licences_router = require("./routes/licences_router");
const app = express();

app.use(bodyParser.json()); // parse incoming JSON data

app.use((req, res, next) => {
  //middleware to solve CORS error
  res.set('Cache-control','no-store');
  res.setHeader("Access-Control-Allow-Origin", "*"); //allow origins to access my data
  res.setHeader("Access-Control-Allow-Methods", "GET"); //allow origins to use my HTTP methods
  res.setHeader("Access-Control-Allow-Headers", "Content-type, Authorization"); //allow origins to use certain headers
  next(); //the request can now continue
});

app.use("/licences", licences_router); 

app.use((error, req, res, next) => {
  // executed whenever an error is thrown with throw() or forwarded with next()
  console.log('Erro capturado:', error);
  const status = error.statusCode || 500; // if error.statusCode is undefined, then status = 500
  const message = error.message;
  const data = error.data;
  //if (!message.includes('invalid signature')){
  res.status(status).json({ message: message, data: data });
  //}
});

app.listen(8080);