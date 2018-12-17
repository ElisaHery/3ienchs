/*jshint esversion :  6 */

// @root/api/country.js

const usersApi = function usersApi(connection) {
  const router = require("express").Router();
  const usersModel = require("./../Model/users")(connection);

  router.get("/user/:id", (req, res) => {
    usersModel.get((err, dataset) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(dataset);
    }, req.params.id);
  });

  router.get("/users", (req, res) => {
    usersModel.get((err, dataset) => {
      res.send(dataset);
    }, null);
  });

  //CONNEXION : VERIF ADRESSE MAIL ET MOT DE PASSE
  router.post("/userLogin", (req, res) => {
    console.log("req.body ==>", req.body);
    usersModel.UserLogin((err, dataset) => {
      if (err) {
        console.log(err);
        return res.status(501).send(err);
      }
      return res.status(200).send(dataset);
    }, req.body);
  });

  //INSCRIPTION : VERIF QUE L'ADRESSE N'EXISTE PAS DEJA ET INSCRIT LE NOUVEL USER
  router.post("/user", (req, res) => {
    usersModel.post((err, dataset) => {
      // console.log(dataset);
      if (err) return res.status(500).send(err);
      return res.status(200).send(dataset);
    }, req.body);
  });

  router.patch("/user", (req, res) => {
    usersModel.update((err, dataset) => {
      if (err) return res.status(500).send(err);
      else return res.status(200).send(dataset);
    }, req.body);
  });

  router.delete("/users", (req, res) => {
    usersModel.remove((err, dataset) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(dataset);
    }, req.body); // tableau d'ids ici ...
  });

  return router;
};

module.exports = usersApi;
