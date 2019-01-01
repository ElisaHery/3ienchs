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
      "SELECT cmd_id, cmd_date, cmd_dateheure_recup, det_id_produit, det_qte_produit FROM commandes INNER JOIN details_commande on commandes.cmd_id = details_commande.det_id_comm INNER JOIN bieres on bieres.biere_id = details_commande.det_id_produit WHERE cmd_id_user = ? AND cmd_over = 1";
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
      "SELECT cmd_id, cmd_date, cmd_dateheure_recup, biere_nom, det_qte_produit FROM commandes INNER JOIN details_commande on commandes.cmd_id = details_commande.det_id_comm INNER JOIN bieres on bieres.biere_id = details_commande.det_id_produit WHERE cmd_id_user = ? AND cmd_over = 0";
    connection.query(q, [user_id], function(err, data, fields) {
      console.log(this.sql);
      console.log(data);
      if (err) return clbk(err, null);
      else return clbk(null, data);
    });
  };

  // USER : PASSER COMMANDE
  const post = function createCommande(clbk, input) {
    const q =
      "INSERT into commandes (cmd_id_user, cmd_date, cmd_dateheure_recup) VALUES (?, now(), ?)";
    connection.query(q, [input.id_user, input.dateheure], function(
      err,
      results,
      fields
    ) {
      console.log(this.sql);
      if (err) return clbk(err, null);
      else return clbk(null, results);
    });
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
    post,
    update,
    remove
  };
};

module.exports = commandesModel;
