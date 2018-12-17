/* jshint esversion : 6 */

// @root/model/country.js

const bieresModel = function bieresModel(connection) {
  const get = function getBeers(clbk, id) {
    console.log(id);
    let q;
    if (id) {
      q = "SELECT * FROM bieres WHERE biere_id = ?";
    } else {
      q = "SELECT * FROM bieres";
    }
    connection.query(q, [id], function(err, data, fields) {
      console.log(this.sql);
      console.log(data);
      if (err) return clbk(err, null);
      else return clbk(null, data);
    });
  };

  const post = function createBeer(clbk, input) {
    // console.log(input);
    const payload = [
      input.nom,
      input.type,
      input.prixHT,
      input.degre,
      input.descr,
      input.packable,
      input.stock
    ];
    // console.log(payload);
    const q =
      "INSERT into bieres (biere_nom, biere_type, biere_prixHT, biere_degre, biere_descr, biere_packable, biere_stock) VALUES (?, ?, ?, ?, ?, ?, ?)";
    connection.query(q, payload, function(err, results, fields) {
      // console.log(this.sql);
      if (err) return clbk(err, null);
      else return clbk(null, results);
    });
  };

  const update = function updateBeer(clbk, input) {
    const q =
      "UPDATE bieres SET biere_nom = ?, biere_type = ?, biere_prixHT = ?, biere_degre = ?, biere_descr = ?, biere_packable = ?, biere_stock = ? WHERE biere_id = ?";
    const payload = [
      input.nom,
      input.type,
      input.prixHT,
      input.degre,
      input.descr,
      input.packable,
      input.stock,
      input.id
    ];
    console.log(payload);
    connection.query(q, payload, function(err, data, fields) {
      console.log(this.sql);
      if (err) return clbk(err, null);
      else return clbk(null, data);
    });
  };

  const remove = function deleteCountry(clbk, id) {
    const q = "DELETE FROM bieres WHERE biere_id IN (?)";
    console.log(id);
    connection.query(q, [id], function(err, data, fields) {
      // console.log(this.sql);
      if (err) return clbk(err, null);
      else return clbk(null, data);
    });
  };

  return {
    get,
    post,
    update,
    remove
  };
};

module.exports = bieresModel;
