/* jshint esversion : 6 */

// @root/model/country.js

const bieresModel = function bieresModel(connection) {
  const getClassicBieres = function getClassicBieres(clbk, id) {
    // console.log(id);
    let q;
    if (id) {
      q = "SELECT * FROM bieres WHERE biere_id = ?";
    } else {
      q = "SELECT * FROM bieres WHERE packable=1";
    }
    connection.query(q, [id], function(err, data, fields) {
      console.log(this.sql);
      console.log("réponse -->", data);
      if (err) return clbk(err, null);
      else return clbk(null, data);
    });
  };

  const getSpecialsBieres = function getSpecialsBieres(clbk) {
    q = "SELECT * FROM bieres WHERE packable=0";
    connection.query(q, function(err, data, fields) {
      // console.log(this.sql);
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
      "INSERT into bieres (nom, type, prixHT, degre, IBU, EBC, descr, artiste, packable, stock) VALUES (?, ?, ?, ?, ?, ?, ?)";
    connection.query(q, payload, function(err, results, fields) {
      // console.log(this.sql);
      if (err) return clbk(err, null);
      else return clbk(null, results);
    });
  };

  const update = function updateBeer(clbk, input) {
    const q =
      "UPDATE bieres SET nom = ?, type = ?, prixHT = ?, degre = ?, IBU = ?, EBC = ?, descr = ?, artiste = ?, packable = ?, stock = ? WHERE biere_id = ?";
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
    getClassicBieres,
    getSpecialsBieres,
    post,
    update,
    remove
  };
};

module.exports = bieresModel;
