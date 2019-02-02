import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { ConnectedUser, LogoutUser } from "./../../actions";
import Moment from "react-moment";

import PathToBack from "../../PathToBack";
import "./ClientDashboard.scss";

let userID, userNom, userPrenom, userMail;

const mapDispatchToProps = dispatch => {
  return {
    ConnectedUser: user => dispatch(ConnectedUser(user)),
    LogoutUser: user => dispatch(LogoutUser(user))
  };
};

const mapStateToProps = state => {
  return {
    connectedUser: state.connectedUser,
    userPrenom: state.userPrenom,
    userNom: state.userNom,
    userID: state.userID,
    userMail: state.userMail
  };
};

class ClientDashboardClass extends Component {
  state = {
    user: "",
    showCommandes: true,
    showAccount: false,
    currentCommandes: [],
    passedCommandes: []
  };

  //déclaration de la fonction pour appeler l'API
  callApi = async (url, corps) => {
    const response = await fetch(url, corps);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  componentDidMount() {
    // const userID = this.props.userID;
    // récupère les commandes en cours
    this.callApi(`${PathToBack}commandesUser/${userID}/0`)
      .then(res => {
        // console.log("commandes en cours ==>", res);
        this.setState({ currentCommandes: res });
      })
      .catch(err => console.log(err));

    // récupère les commandes passées
    this.callApi(`${PathToBack}commandesUser/${userID}/1`)
      .then(res => {
        // console.log("commandes passées ==>", res);
        this.setState({ passedCommandes: res });
      })
      .catch(err => console.log(err));
  }

  //switch entre l'affichage de la fenêtre des commandes ou du compte du client
  toggleDashboard(e) {
    var name = e.target.getAttribute("name");

    if (this.state.showCommandes) {
      if (name !== "showCommandes") {
        this.setState({
          showCommandes: !this.state.showCommandes,
          showAccount: !this.state.showAccount
        });
      } else return null;
    } else if (this.state.showAccount) {
      if (name !== "showAccount") {
        this.setState({
          showCommandes: !this.state.showCommandes,
          showAccount: !this.state.showAccount
        });
      } else return null;
    }
  }

  sendInLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  logOut(e) {
    // this.props.ConnectedUser(false);
    this.props.LogoutUser("user");
    //ajouter une modale "être vous sur de vouloir vous deconnecter"
    //enlève les infos du local storage
    localStorage.clear();
    // en même temps on envoie au store redux l'information que l'user est déconnecté, pour provoquer un re-render
    // this.props.ConnectedUser(false);
    this.forceUpdate();
  }

  render() {
    // const userNom = this.props.userNom;
    // const userPrenom = this.props.userPrenom;
    // const userMail = this.props.userMail;

    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (user) {
      userPrenom = user.user_prenom;
      userNom = user.user_nom;
      userMail = user.user_mail;
      userID = user.user_id;
      // console.log(userPrenom, userNom, userMail, userID);
    }

    const token = JSON.parse(localStorage.getItem("token") || "null");
    // console.log(token);
    if (token)
      return (
        <Fragment>
          <section className="dashboardContainer">
            <div className="menuDashboard">
              <ul>
                <li name="showCommandes" onClick={e => this.toggleDashboard(e)}>
                  Mes commandes
                </li>
                <li name="showAccount" onClick={e => this.toggleDashboard(e)}>
                  Mon compte
                </li>
                <li onClick={e => this.logOut(e)}>Déconnexion</li>
              </ul>
            </div>
            <div className="dashboard">
              {this.state.showCommandes && (
                <Fragment>
                  {" "}
                  <p className="title">Mes commandes en cours</p>
                  {this.state.currentCommandes.length !== 0 ? (
                    <table className="table_commandes">
                      <thead>
                        <tr>
                          <th>N° de commande</th>
                          <th>Date de commande</th>
                          <th>Montant</th>
                          <th>Retrait prévu</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.currentCommandes.map(e => (
                          <tr key={e.cmd_id}>
                            <td>{e.cmd_id}</td>
                            <td>
                              {" "}
                              <Moment format="DD/MM/YYYY">{e.cmd_date}</Moment>
                            </td>
                            {/* <td>{e.cmd_date}</td> */}
                            <td>{e.cmd_prix.toFixed(2)} €</td>
                            <td>
                              {" "}
                              <Moment format="DD/MM/YYYY">
                                {e.cmd_dateheure_recup}
                              </Moment>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="p_board">Vous n'avez pas d'historique</p>
                  )}
                  <p className="title">Mes commandes passées</p>{" "}
                  {this.state.passedCommandes.length !== 0 ? (
                    <table className="table_commandes">
                      <thead>
                        <tr>
                          <th>N° de commande</th>
                          <th>Date de commande</th>
                          <th>Montant</th>
                          <th>Retrait</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.passedCommandes.map(e => (
                          <tr key={e.cmd_id}>
                            <td>{e.cmd_id}</td>
                            <td>
                              {" "}
                              <Moment format="DD/MM/YYYY">{e.cmd_date}</Moment>
                            </td>
                            <td>{e.cmd_prix.toFixed(2)}€</td>
                            <Moment format="DD/MM/YYYY">
                              {e.cmd_dateheure_recup}
                            </Moment>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="p_board">Vous n'avez pas d'historique</p>
                  )}
                </Fragment>
              )}

              {this.state.showAccount && (
                <Fragment>
                  <p>
                    <span>Nom :</span> <span>{userNom}</span>
                  </p>
                  <p>
                    <span>Prénom :</span> <span>{userPrenom}</span>
                  </p>
                  <p>
                    <span>Mail :</span> <span>{userMail}</span>
                  </p>
                </Fragment>
              )}
            </div>
          </section>
        </Fragment>
      );
  }
}

const ClientDashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientDashboardClass);
export default ClientDashboard;
