/*jshint esversion :  6 */

// @root/api/country.js

const commandesApi = function usersApi(connection) {
  const router = require("express").Router();
  const commandesModel = require("./../Model/commandes")(connection);

  router.get("/commandes", (req, res) => {
    commandesModel.get((err, dataset) => {
      res.send(dataset);
    }, null);
  });

  router.get("/commande/:id", (req, res) => {
    commandesModel.get((err, dataset) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(dataset);
    }, req.params.id);
  });

  //USER : VOIR SON HISTORIQUE DE COMMANDES
  router.get("/old_commandes_user/:user_id", (req, res) => {
    commandesModel.getUserOldCommandes((err, dataset) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(dataset);
    }, req.params.user_id);
  });

  //USER : VOIR SES COMMANDES EN COURS
  router.get("/current_commandes_user/:user_id", (req, res) => {
    commandesModel.getUserCurrentCommandes((err, dataset) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(dataset);
    }, req.params.user_id);
  });

  // USER : PASSER COMMANDE
  router.post("/commande", (req, res) => {
    commandesModel.post((err, dataset) => {
      console.log(dataset);
      if (err) return res.status(500).send(err);
      return res.status(200).send(dataset);
    }, req.body);
  });

  // USER : MODIFIER LA DATE DE RETRAIT DE SA COMMANDE - ADMIN : PASSER LA COMMANDE EN "OVER"
  router.patch("/commande", (req, res) => {
    commandesModel.update((err, dataset) => {
      if (err) return res.status(500).send(err);
      else return res.status(200).send(dataset);
    }, req.body);
  });

  //USER: SUPPRIMER UNE COMMANDE EN COURS
  router.delete("/commandes", (req, res) => {
    commandesModel.remove((err, dataset) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(dataset);
    }, req.body);
  });

  return router;
};

module.exports = commandesApi;
