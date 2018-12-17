/*jshint esversion :  6 */

// @root/api/country.js

const bieresApi = function bieresApi(connection) {
  const router = require("express").Router();
  const bieresModel = require("./../Model/bieres")(connection);

  router.post("/biere", (req, res) => {
    bieresModel.post((err, dataset) => {
      console.log(dataset);
      if (err) return res.status(500).send(err);
      return res.status(200).send(dataset);
    }, req.body);
  });

  router.get("/biere/:id", (req, res) => {
    bieresModel.get((err, dataset) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(dataset);
    }, req.params.id);
  });

  router.get("/bieres", (req, res) => {
    bieresModel.get((err, dataset) => {
      res.send(dataset);
    }, null);
  });

  router.patch("/biere", (req, res) => {
    bieresModel.update((err, dataset) => {
      if (err) return res.status(500).send(err);
      else return res.status(200).send(dataset);
    }, req.body);
  });

  router.delete("/bieres", (req, res) => {
    bieresModel.remove((err, dataset) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(dataset);
    }, req.body); // tableau d'ids ici ...
  });

  return router;
};

module.exports = bieresApi;
