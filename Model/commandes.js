/* jshint esversion : 6 */

// @root/model/country.js

const commandesModel = function commandesModel(connection) {
  const get = function getCommandes(clbk, id) {
    console.log(id);
    let q;
    if (id) {
      q = "SELECT * FROM commandes WHERE cmd_id = ?";
    } else {
      q = "SELECT * FROM commandes";
    }
    connection.query(q, [id], function(err, data, fields) {
      console.log(this.sql);
      console.log(data);
      if (err) return clbk(err, null);
      else return clbk(null, data);
    });
  };

  const getUsersCommandes = function getUsersCommandes(clbk, user_id) {
    const q = "SELECT * FROM commandes WHERE cmd_id_user = ?";
    connection.query(q, [user_id], function(err, data, fields) {
      console.log(this.sql);
      console.log(data);
      if (err) return clbk(err, null);
      else return clbk(null, data);
    });
  };

  //USER : VOIR SON HISTORIQUE DE COMMANDES
  const getUserOldCommandes = function getUserOldCommandes(clbk, user_id) {
    const q =
      "SELECT cmd_id, cmd_date, cmd_dateheure_recup, cmd_prix, nom, det_qte_produit FROM commandes INNER JOIN details_commande on commandes.cmd_id = details_commande.det_id_comm INNER JOIN bieres on bieres.biere_id = details_commande.det_id_produit WHERE cmd_id_user = ? AND cmd_over = 1 ORDER BY det_id_comm ASC";
    connection.query(q, [user_id], function(err, data, fields) {
      // console.log(this.sql);
      // console.log(data);
      if (err) return clbk(err, null);
      else return clbk(null, data);
    });
  };

  //USER : VOIR SES COMMANDES EN COURS
  const getUserCurrentCommandes = function getUserCurrentCommandes(
    clbk,
    user_id
  ) {
    const q =
      "SELECT cmd_id, cmd_date, cmd_dateheure_recup, cmd_prix, nom, det_qte_produit FROM commandes INNER JOIN details_commande on commandes.cmd_id = details_commande.det_id_comm INNER JOIN bieres on bieres.biere_id = details_commande.det_id_produit WHERE cmd_id_user = ? AND cmd_over = 0  ORDER BY det_id_comm ASC";
    connection.query(q, [user_id], function(err, data, fields) {
      console.log(this.sql);
      console.log(data);
      if (err) return clbk(err, null);
      else return clbk(null, data);
    });
  };

  // USER : PASSER COMMANDE

  const createCommande = function createCommande(clbk, input) {
    const q =
      "INSERT into commandes (cmd_id_user, cmd_date, cmd_dateheure_recup, cmd_prix, cmd_over) VALUES (?, now(), ?, ?, ?)";
    const q2 =
      "INSERT into details_commande (det_id_comm, det_id_produit, det_qte_produit) VALUES (?, ?, ?)";
    const query1 = connection.query(
      q,
      [input.id_user, input.dateheure, input.cmd_prix, input.cmd_over],
      function(err, resultsFromQ1, fields) {
        if (err) return clbk(err, null);
        //       console.log("resultats requete 1 --> ", resultsFromQ1);
        else {
          const tmp = [];
          input.panier.forEach((element, i) => {
            connection.query(
              q2,
              [resultsFromQ1.insertId, element.id, element.quantity],
              function(err, dataFromQ2, fields) {
                console.log("requete 2 --> ", this.sql);
                //             console.log("resultats requete 2 --> ", dataFromQ2);
                if (err) return clbk(err, null);
                tmp.push(dataFromQ2);
                if (i === input.panier.length - 1) {
                  return clbk(null, tmp);
                }
              }
            );
          });

          console.log("renvoie au front -->", tmp);
        }
      }
    );
    console.log("requete 1 --> ", query1.sql);
  };

  // USER : MODIFIER LA DATE DE RETRAIT DE SA COMMANDE - ADMIN : PASSER LA COMMANDE EN "OVER"
  const update = function updateCommande(clbk, input) {
    const q = "UPDATE commandes SET cmd_dateheure_recup = ? WHERE cmd_id = ?";
    const payload = [input.dateheure, input.id];
    // console.log(payload);
    connection.query(q, payload, function(err, data, fields) {
      console.log(this.sql);
      if (err) return clbk(err, null);
      else return clbk(null, data);
    });
  };

  //USER: SUPPRIMER UNE COMMANDE EN COURS
  const remove = function deleteCommande(clbk, id) {
    const q = "DELETE FROM commandes WHERE cmd_id IN (?)";
    console.log(id);
    connection.query(q, [id], function(err, data, fields) {
      // console.log(this.sql);
      if (err) return clbk(err, null);
      else return clbk(null, data);
    });
  };

  return {
    get,
    getUsersCommandes,
    getUserOldCommandes,
    getUserCurrentCommandes,
    post: createCommande,
    update,
    remove
  };
};

module.exports = commandesModel;
