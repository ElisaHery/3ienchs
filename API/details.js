/*jshint esversion :  6 */

// @root/api/country.js

const detailsApi = function detailsApi(connection) {
  const router = require("express").Router();
  const detailsModel = require("./../Model/details")(connection);

  router.get("/commande/:id", (req, res) => {
    detailsModel.get((err, dataset) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(dataset);
    }, req.params.id);
  });

  router.get("/commandes", (req, res) => {
    detailsModel.get((err, dataset) => {
      res.send(dataset);
    }, null);
  });

  //   router.get("/commandes_user/:user_id", (req, res) => {
  //     detailsModel.getUsersCommandes((err, dataset) => {
  //       if (err) return res.status(500).send(err);
  //       return res.status(200).send(dataset);
  //     }, req.params.user_id);
  //   });

  //   router.post("/commande", (req, res) => {
  //     detailsModel.post((err, dataset) => {
  //       console.log(dataset);
  //       if (err) return res.status(500).send(err);
  //       return res.status(200).send(dataset);
  //     }, req.body);
  //   });

  //   router.patch("/commande", (req, res) => {
  //     detailsModel.update((err, dataset) => {
  //       if (err) return res.status(500).send(err);
  //       else return res.status(200).send(dataset);
  //     }, req.body);
  //   });

  //   router.delete("/commandes", (req, res) => {
  //     detailsModel.remove((err, dataset) => {
  //       if (err) return res.status(500).send(err);
  //       return res.status(200).send(dataset);
  //     }, req.body);
  //   });

  return router;
};

module.exports = detailsApi;
