import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { ConnectedUser } from "./../../actions";

import Header from "../../Components/Header/Header.js";
import Footer from "../../Components/Footer/Footer";
import SocialMedias from "../../Components/SocialMedias/SocialMedias";
import PathToBack from "../../PathToBack";

import "./Login.scss";

const mapDispatchToProps = dispatch => {
  return {
    ConnectedUser: user => dispatch(ConnectedUser(user))
  };
};

const mapStateToProps = state => {
  return {
    filters: {
      connectedUser: state.connectedUser,
      userName: state.userName
    }
  };
};

class LoginClass extends Component {
  state = {
    nom: "",
    prenom: "",
    mail: "",
    password: "",
    password2: "",
    error: false,
    errorMessage: "",
    connectionDiv: true,
    inscriptionDiv: false,
    nouvelInscrit: false
  };

  //switch entre l'affichage de la fenêtre de connexion ou d'inscription
  toggleDiv(e) {
    this.setState({
      connectionDiv: !this.state.connectionDiv,
      inscriptionDiv: !this.state.inscriptionDiv,
      error: false
    });
  }

  //déclaration de la fonction pour appeler l'API
  callApi = async (url, corps) => {
    const response = await fetch(url, corps);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  //capte le contenu des inputs
  handleChange(evt) {
    console.log(evt.target.value);
    this.setState({ [evt.target.name]: evt.target.value });
  }

  //permet le login user, envoie la demande à l'API, et une fois une réponse positive obtenue
  //envoie les infos de connexion au store redux.
  loginUser(evt) {
    evt ? evt.preventDefault() : console.log("ok");
    const data = { mail: this.state.mail, password: this.state.password };

    if (!data.mail || !data.password) {
      this.setState({
        error: true,
        errorMessage: "veuillez remplir tous les champs"
      });
    } else {
      const fetch_param = {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data)
      };
      // console.log(data);
      this.callApi(`${PathToBack}user/login`, fetch_param)
        .then(response => {
          // console.log(response[0].user_nom);
          console.log(response);
          this.props.ConnectedUser(response.user_prenom);
          this.setState({ nouvelInscrit: false });
        })
        .catch(err => {
          console.log(err);
          this.setState({ error: true, errorMessage: err.message });
        });
    }
  }
  //envoie les informations pour une inscription user. une fois celle-ci effectuée, active le message de bienvenue
  //aux nouveaux users et revient sur la div de connexion
  inscriptionUser(evt) {
    evt.preventDefault();
    const data = {
      nom: this.state.nom,
      prenom: this.state.prenom,
      mail: this.state.mail,
      password: this.state.password
    };

    if (!data.nom || !data.prenom || !data.mail || !data.password) {
      this.setState({
        error: true,
        errorMessage: "veuillez remplir tous les champs"
      });
    } else if (this.state.password !== this.state.password2) {
      this.setState({
        error: true,
        errorMessage: "attention, les mots de passe ne sont pas similaires"
      });
    } else {
      const fetch_param = {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data)
      };
      // console.log(data);
      this.callApi(`${PathToBack}user/inscription`, fetch_param)
        .then(response => {
          console.log(response);
          this.setState({ nouvelInscrit: true });
          this.toggleDiv();
        })
        .catch(err => {
          console.log(err);
          this.setState({ error: true, errorMessage: err.message });
        });
    }
  }

  render() {
    const connectedUser = this.props.filters.connectedUser;
    return (
      <Fragment>
        <Header />
        {/* SI USER CONNECTE */}
        {connectedUser ? (
          <div className="loginPageWrap">
            <h1>ESPACE CLIENT</h1>
            <section className="loginWrap">
              <div className="loginMiniWrap">
                <h2>
                  Vous êtes connecté-e, bienvenue {this.props.filters.userName}!
                </h2>
              </div>{" "}
            </section>{" "}
          </div>
        ) : (
          // SI USER PAS CONNECTE
          <div className="loginPageWrap">
            <h1>CONNEXION</h1>
            <section className="loginWrap">
              {/* FENETRE DE CONNEXION */}
              {this.state.connectionDiv && (
                <div className="loginMiniWrap">
                  {/* SI USER VIENT DE SINSCRIRE MESSAGE DE BIENVENUE */}
                  {this.state.nouvelInscrit ? (
                    <p>
                      Félicitations, vous êtes bien inscrit-e! Vous pouvez
                      maintenant vous connecter.
                    </p>
                  ) : (
                    // SINON PAS DE MESSAGE DE BIENVENUE
                    <h2>Connectez-vous</h2>
                  )}
                  <form onSubmit={e => this.loginUser(e)}>
                    <input
                      type="text"
                      placeholder="email"
                      name="mail"
                      onChange={e => this.handleChange(e)}
                    />
                    <input
                      type="text"
                      name="password"
                      placeholder="mot de passe"
                      onChange={e => this.handleChange(e)}
                    />
                    <input type="submit" />
                    {this.state.error && <p>{this.state.errorMessage}</p>}
                  </form>
                  <p>
                    Pas encore inscrit-e ?{" "}
                    <span onClick={e => this.toggleDiv(e)}>C'est par ici</span>
                  </p>
                </div>
              )}
              {/* FENETRE D'INSCRIPTION */}
              {this.state.inscriptionDiv && (
                <div className="loginMiniWrap">
                  <h2>Créez votre compte</h2>
                  <form onSubmit={e => this.inscriptionUser(e)}>
                    <input
                      type="text"
                      placeholder="nom"
                      name="nom"
                      // value="malkiewtiz"
                      onChange={e => this.handleChange(e)}
                    />
                    <input
                      type="text"
                      placeholder="prenom"
                      // value="ziggy"
                      name="prenom"
                      onChange={e => this.handleChange(e)}
                    />
                    <input
                      type="text"
                      placeholder="email"
                      // value="zmalk@pouet.org"
                      name="mail"
                      onChange={e => this.handleChange(e)}
                    />
                    <input
                      type="password"
                      // value="mdp"
                      name="password"
                      placeholder="mot de passe"
                      onChange={e => this.handleChange(e)}
                    />
                    <input
                      type="password"
                      name="password2"
                      // value="mdp"x
                      placeholder="répétez le mot de passe"
                      onChange={e => this.handleChange(e)}
                    />
                    <input type="submit" />
                    {this.state.error && (
                      <p className="error">{this.state.errorMessage}</p>
                    )}
                  </form>
                  <p>
                    Déjà inscrit-e ?{" "}
                    <span onClick={e => this.toggleDiv(e)}>Connectez-vous</span>
                  </p>
                </div>
              )}
            </section>
          </div>
        )}

        <Footer />
        <SocialMedias />
      </Fragment>
    );
  }
}

const Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginClass);
export default Login;
