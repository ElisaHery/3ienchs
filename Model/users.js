/* jshint esversion : 6 */

// @root/model/country.js

const usersModel = function usersModel(connection) {
  const get = function getUser(clbk, id) {
    // console.log(id);
    let q = "SELECT * FROM users WHERE user_id = ?";
    connection.query(q, [id], function(err, data, fields) {
      // console.log(this.sql);
      // console.log(data);
      if (err) return clbk(err, null);
      else return clbk(null, data);
    });
  };

  const getAll = function getUsers(clbk) {
    // console.log(id);
    let q = "SELECT * FROM users";
    connection.query(q, function(err, data, fields) {
      // console.log(this.sql);
      // console.log(data);
      if (err) return clbk(err, null);
      else return clbk(null, data);
    });
  };

  //CONNEXION USER DEJA INSCRIT
  const UserLogin = function checkUser(clbk, input) {
    const email = input.mail;
    const password = input.password;
    // console.log(email, password);
    q = "SELECT * FROM users WHERE user_mail = ?";

    //on vérifie si l'adresse mail existe
    connection.query(q, [email], function(err, data, fields) {
      // console.log(this.sql);
      // console.log("data ==>", data);
      if (err) return clbk({ err: "unknown" }, null);
      else {
        //si il y a une data correspondante, on vérifie la concordance du mot de passe
        if (data.length > 0) {
          //si le mot de passe est correct --> connexion
          if (data[0].user_password === password) {
            return clbk(null, data);
          }
          //sinon --> mot de passe incorrect
          else {
            return clbk({ message: "mot de passe incorrect" }, null);
          }
        }

        //sinon on ne renvoie rien
        return clbk({ message: "adresse email introuvable" }, null);
      }
    });
  };

  const getByMail = function getUserByMail(clbk, mail) {
    const sql = `SELECT * FROM users WHERE user_mail = ?`;
    const q = connection.query(sql, mail, function(err, user) {
      // console.log("user -->", user);
      if (err) return clbk({ message: "adresse email inconnue" }, null);
      return clbk(null, ...user);
    });
    // console.log(q.sql);
  };

  //CREATION NOUVEL USER
  const userInscription = function createUser(clbk, input) {
    const payload = [input.nom, input.prenom, input.mail, input.password];
    const q0 = "SELECT * FROM users WHERE user_mail = ?";
    const q =
      "INSERT into users (user_nom, user_prenom, user_mail, user_password ) VALUES (?, ?, ?, ?)";
    //on vérifie que l'adresse mail n'est pas déjà enregistrée
    connection.query(q0, [input.mail], function(err, results, fields) {
      if (err) return clbk(err, null);
      else {
        //si ce n'est pas le cas, on crée un user
        if (results.length === 0) {
          connection.query(q, payload, function(err, results, fields) {
            // console.log(this.sql);
            if (err) return clbk(err, null);
            else return clbk(null, results, payload);
          });
        } else {
          return clbk(
            //sinon : erreur
            { message: "cette adresse e-mail est déjà liée à un compte" },
            null
          );
        }
      }
    });
  };

  const update = function updateUser(clbk, data) {
    const q =
      "UPDATE users SET user_nom = ?, user_prenom = ?, user_mail = ? WHERE user_id = ?";
    const payload = [
      data.user_nom,
      data.user_prenom,
      data.user_mail,
      data.user_id
    ];
    console.log(payload);
    connection.query(q, payload, function(err, data, fields) {
      console.log(this.sql);
      console.log(data);
      if (err) return clbk(err, null);
      else return clbk(null, data);
    });
  };

  const remove = function deleteUsers(clbk, id) {
    const q = "DELETE FROM users WHERE user_id IN (?)";
    console.log(id);
    connection.query(q, [id], function(err, data, fields) {
      // console.log(this.sql);
      if (err) return clbk(err, null);
      else return clbk(null, data);
    });
  };

  return {
    get,
    UserLogin,
    getByMail,
    userInscription,
    update,
    remove
  };
};

module.exports = usersModel;
