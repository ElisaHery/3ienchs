/*jshint esversion :  6 */

// @root/api/country.js

var bcrypt = require("bcryptjs");
const auth = require("./utils/auth");

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

  router.post("/user/login", (req, res) => {
    // on récupère l'user par son mail
    // console.log(req.body.mail);
    usersModel.getByMail((err, user) => {
      // si erreur interne au serveur, retourner l'erreur au client
      // console.log("req.body.password ==>", req.body.password);
      // console.log("user.password ==>", user);
      if (err) return res.status(500).send(err);
      // si le mail n'existe pas en bdd, retourner une erreur au client
      else if (!user) return res.status(401).send({ message: "mail inconnu" });

      // sinon  le mail a été trouvé, comparer le password avec son crypt/salt
      bcrypt
        .compare(req.body.password, user.user_password)
        .then(function(match) {
          console.log(match);
          // si le password est invalide, retourner une erreur au client
          if (!match) return res.status(401).send({ message: "login failed" });

          // tout est ok => retourner l'objet user (sans password, etc.) au client
          // accompagné d'un token dans l'entête HTTP pour sécuriser l'accès au dashboard.

          user = auth.removeSensitiveInfo(user);
          // const token = auth.createToken(user, req.ip);
          return (
            res
              // .header("x-authenticate", token)
              .status(200)
              // .send({ user, token })
              .send(user)
          );
        })
        .catch(err => {
          console.log("@catch", err);
          res.status(500).send(err);
        }); // si bcrypt a planté, => erreur au client
    }, req.body.mail);
  });

  //INSCRIPTION : VERIF QUE L'ADRESSE N'EXISTE PAS DEJA ET INSCRIT LE NOUVEL USER
  router.post("/user/inscription", (req, res) => {
    console.log("req.body ==>", req.body);
    const { nom, prenom, mail, password } = req.body; //destructuration
    const newUser = { nom, prenom, mail };
    bcrypt
      .hash(password, 10)
      .then(hash => {
        newUser.password = hash;
        return usersModel.userInscription((err, dataset) => {
          if (err) {
            console.log(err);
            return res.status(520).send(err);
          }
          return res.status(200).send(dataset);
        }, newUser);
      })
      .catch(err => {
        return res.status(500).send(err);
      });
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
