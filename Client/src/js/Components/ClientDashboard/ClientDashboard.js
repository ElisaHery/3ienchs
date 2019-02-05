import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { ConnectedUser, LogoutUser } from "./../../actions";
import Moment from "react-moment";
import Button from "./../../Components/Button/Button";

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
    passedCommandes: [],
    editProfile: false,
    editedUserNom: "",
    editedUserPrenom: "",
    editedUserMail: ""
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
        e.target.classList.add("active");
        document
          .getElementsByName("showCommandes")[0]
          .classList.remove("active");
        // const test = document.getElementsByName("showCommandes");
        // console.log(test);
      } else return null;
    } else if (this.state.showAccount) {
      if (name !== "showAccount") {
        this.setState({
          showCommandes: !this.state.showCommandes,
          showAccount: !this.state.showAccount
        });
        e.target.classList.add("active");
        document.getElementsByName("showAccount")[0].classList.remove("active");
      } else return null;
    }
  }

  sendInLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  activateEditProfileMode = () => {
    this.setState({ editProfile: !this.state.editProfile });
  };

  modifyProfile = evt => {
    console.log(evt.target.value);
    this.setState({ [evt.target.name]: evt.target.value });
  };

  checkIfModifiedData = (newData, oldData) => {
    if (newData.length > 0 && newData !== oldData) {
      return newData;
    } else {
      return oldData;
    }
  };

  editProfile = () => {
    this.setState({ editProfile: !this.state.editProfile });
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("ancienne data ==>", user);

    const editedNom = this.checkIfModifiedData(
      this.state.editedUserNom,
      user.user_nom
    );
    const editedPrenom = this.checkIfModifiedData(
      this.state.editedUserPrenom,
      user.user_prenom
    );
    const editedMail = this.checkIfModifiedData(
      this.state.editedUserMail,
      user.user_mail
    );

    const data = {
      user_id: user.user_id,
      user_nom: editedNom,
      user_prenom: editedPrenom,
      user_mail: editedMail
    };

    console.log("nouvelle data ==>", data);
    const fetch_param = {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data)
    };

    this.callApi(`${PathToBack}user`, fetch_param)
      .then(response => {
        console.log(response);
        this.sendInLocalStorage("user", data);
        this.forceUpdate();
      })

      .catch(err => {
        console.log(err);
        this.setState({ error: true, errorMessage: err.message });
      });
  };

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
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (user) {
      userPrenom = user.user_prenom;
      userNom = user.user_nom;
      userMail = user.user_mail;
      userID = user.user_id;
    }

    const token = JSON.parse(localStorage.getItem("token") || "null");
    // console.log(token);
    if (token)
      return (
        <Fragment>
          <section className="dashboardContainer">
            <div className="menuDashboard">
              <ul>
                <li
                  name="showCommandes"
                  className="active"
                  onClick={e => this.toggleDashboard(e)}
                >
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
                              <Moment format="DD/MM/YYYY  à  HH:mm">
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
                  <p className="myAccount">
                    <span>Nom :</span>{" "}
                    {!this.state.editProfile ? (
                      <span> {userNom} </span>
                    ) : (
                      <input
                        placeholder={userNom}
                        name="editedUserNom"
                        onChange={this.modifyProfile}
                      />
                    )}
                  </p>
                  <p className="myAccount">
                    <span>Prénom :</span>{" "}
                    {!this.state.editProfile ? (
                      <span> {userPrenom} </span>
                    ) : (
                      <input
                        placeholder={userPrenom}
                        name="editedUserPrenom"
                        onChange={this.modifyProfile}
                      />
                    )}
                  </p>
                  <p className="myAccount">
                    <span>Mail :</span>{" "}
                    {!this.state.editProfile ? (
                      <span> {userMail} </span>
                    ) : (
                      <input
                        placeholder={userMail}
                        name="editedUserMail"
                        onChange={this.modifyProfile}
                      />
                    )}
                  </p>

                  {!this.state.editProfile ? (
                    <button
                      className="modifierProfil"
                      onClick={this.activateEditProfileMode}
                    >
                      Modifier mon profil
                    </button>
                  ) : (
                    <button
                      className="modifierProfil"
                      onClick={this.editProfile}
                    >
                      Valider
                    </button>
                  )}
                </Fragment>
              )}
            </div>
          </section>
        </Fragment>
      );
    else
      return (
        <section className="dashboardContainer">
          <div className="menuDashboard" />
          <div className="dashboard">
            <p className="title">Vous êtes déconnecté-e</p>
          </div>
        </section>
      );
  }
}

const ClientDashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientDashboardClass);
export default ClientDashboard;
