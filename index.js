/* jshint esversion : 6 */

// @root/index.js
// const serverDataGetter = require("./utils/serverside-data-getter");
const express = require("express");
// const http = require("http");
const port = process.env.PORT || 5000;
const app = express();
// const baseURL = `http://localhost:${port}`;
const api = require(__dirname + "/API");
const cors = require("cors");
app.use(cors());

// APP CONFIG !!!
app.use(express.json()); // on  peut recevoir des données POST en json via req.body
app.use(api.prefix, api.routers); // on préfixe chaque route des API par api/v1/

app.use(express.static(__dirname + "/Client/build"));

// ROUTES DES PAGES DE l"APPLICATION
app.get("/", function(req, res) {
  res.send("hello from node");
  // on passe un objet ({nom: "gui"}) à la vue, accessible via localhost:5000/
});

// app.get("/bieres", (req, res) => {
//   res.send("okidoki");
//   // bieresModel.get((err, dataset) => {
//   //   res.send(dataset);
//   // }, null);
// });

app.listen(port, function() {
  console.log("node server running @ http://localhost:" + port);
});
