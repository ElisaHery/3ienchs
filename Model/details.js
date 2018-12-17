/* jshint esversion : 6 */

// @root/model/country.js

const detailsModel = function detailsModel(connection) {
  const get = function getDetailsCommande(clbk, id) {
    console.log(id);
    let q = "SELECT * FROM details_commande WHERE det_id_comm = ?";
    connection.query(q, [id], function(err, data, fields) {
      console.log(this.sql);
      console.log(data);
      if (err) return clbk(err, null);
      else return clbk(null, data);
    });
  };

  const getUserOldCommandes = function getUserOldCommandes(clbk, user_id) {
    const q = "SELECT * FROM commandes WHERE cmd_id_user = ? AND cmd_over = 1";
    connection.query(q, [user_id], function(err, data, fields) {
      console.log(this.sql);
      console.log(data);
      if (err) return clbk(err, null);
      else return clbk(null, data);
    });
  };

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
    getUserOldCommandes,
    post,
    update,
    remove
  };
};

module.exports = detailsModel;
