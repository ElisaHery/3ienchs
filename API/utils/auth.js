module.exports = (function myAuthLib() {
  "use strict";

  const crypto = require("crypto");
  const jwt = require("jsonwebtoken");
  const secret = "@2018/_Elisa.3ienchs.JKcziéçà0,%*--@/@";

  /**
   * @function
   * @module authenticate a middleware to use in express routes
   * @param {Object} req an express http request object
   * @param {String} req.header["x-authenticate"] the jwt token available in http request header
   * @param {Object} res an express http response object
   * @param {Function} next a function allowing to go back to initial express route callback
   * @return {undefined} RAS
   */
  var authenticate = function authenticate(req, res, next) {
    try {
      const token = req.header("x-authenticate");
      jwt.verify(token, secret);
      req.isAuthenticated = token;
      next(); // si pas d'erreur, la fonction appelante continue son exécution
    } catch (err) {
      res.status(401).send(err);
    }
  };

  /**
   * verify an http req to determine is user credntials are correct
   * @function
   * @param {Object} req - An express http request object
   * @returns {Boolean} true if user credentials are coreect, false otherwise
   */
  const verifyToken = function verifyToken(token) {
    try {
      const check = jwt.verify(token, secret);
      return { msg: check, status: true };
    } catch (err) {
      return { msg: err.message, status: false };
    }
  };

  /**
   * verify an http req to determine is user credntials are correct
   * @function
   * @param {Object} req - An express http request object
   * @returns {Boolean} true if user credentials are coreect, false otherwise
   */
  const createToken = function createToken(user, ip) {
    return jwt.sign(
      {
        id: user.id,
        ip: ip
      },
      secret
    );
  };

  /**
   * takes an user object as argument and returns a copy of it after deleting sensitive infos such as passord or mail
   * @function
   * @param {Object} u - A user object fetched from database
   * @returns {Object} filteredUser - the user minus sensitive values
   */
  const removeSensitiveInfo = function removeSensitiveInfo(u) {
    if (!u) throw new Error("A User object is required as argument");
    const filteredUser = {};
    const keys = ["user_password"];

    for (let key in keys) {
      delete u[keys[key]];
    }

    for (let prop in u) {
      if (u.hasOwnProperty(prop)) filteredUser[prop] = u[prop];
    }

    return filteredUser;
  };

  /**
   * generates random string of characters i.e salt
   * @function
   * @tutorial https://ciphertrick.com/2016/01/18/salt-hash-passwords-using-nodejs-crypto/
   * @param {Number} length - Length of the random string.
   */
  const genRandomString = function genRandomString(length) {
    return crypto
      .randomBytes(Math.ceil(length / 2))
      .toString("hex") /** convert to hexadecimal format */
      .slice(0, length); /** return required number of characters */
  };

  /**
   * hash password with sha512.
   * @function
   * @param {string} password - List of required fields.
   * @tutorial https://ciphertrick.com/2016/01/18/salt-hash-passwords-using-nodejs-crypto/
   * @param {string} salt - Data to be validated.
   */
  const sha512 = function(password, salt) {
    var hash = crypto.createHmac(
      "sha512",
      salt
    ); /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest("hex");
    return {
      salt: salt,
      passwordHash: value
    };
  };

  return {
    authenticate,
    createToken,
    verifyToken,
    // genRandomString,
    // sha512,
    removeSensitiveInfo
  };
})();
