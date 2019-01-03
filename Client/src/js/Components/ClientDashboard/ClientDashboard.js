import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { ConnectedUser, LogoutUser } from "./../../actions";

import PathToBack from "../../PathToBack";
import "./ClientDashboard.scss";

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
    const userID = this.props.userID;
    // commandes en cours
    this.callApi(`${PathToBack}current_commandes_user/${userID}`)
      .then(res => {
        console.log("commandes en cours ==>", res);
        this.setState({ currentCommandes: res });
      })
      .catch(err => console.log(err));

    // commandes passées
    this.callApi(`${PathToBack}old_commandes_user/${userID}`)
      .then(res => {
        console.log("commandes passées ==>", res);
        this.setState({ passedCommandes: res });
      })
      .catch(err => console.log(err));
  }

  //switch entre l'affichage de la fenêtre des commandes ou du compte du client
  toggleDashboard(e) {
    this.setState({
      showCommandes: !this.state.showCommandes,
      showAccount: !this.state.showAccount
    });
  }

  logOut(e) {
    this.props.ConnectedUser(false);
    window.location = "/";
  }

  render() {
    const userNom = this.props.userNom;
    const userPrenom = this.props.userPrenom;
    const userMail = this.props.userMail;
    return (
      <Fragment>
        <section className="dashboardContainer">
          <div className="menuDashboard">
            <ul>
              <li onClick={e => this.toggleDashboard(e)}>Mes commandes</li>
              <li onClick={e => this.toggleDashboard(e)}>Mon compte</li>
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
                        <th>Numéro de la commande</th>
                        <th>Date de commande</th>
                        <th>Quantité</th>
                        <th>Bière</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.currentCommandes.map(e => (
                        <tr key={e.cmd_id}>
                          <th>{e.cmd_id}</th>
                          <th>{e.cmd_date}</th>
                          <th>{e.det_qte_produit}</th>
                          <th>{e.biere_nom}</th>
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
                        <th>Numéro de la commande</th>
                        <th>Date de commande</th>
                        <th>Quantité</th>
                        <th>Bière</th>
                        <th>Retrait</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.passedCommandes.map(e => (
                        <tr key={e.cmd_id}>
                          <th>{e.cmd_id}</th>
                          <th>{e.cmd_date}</th>
                          <th>{e.det_qte_produit}</th>
                          <th>{e.biere_nom}</th>
                          <th>{e.cmd_dateheure_recup}</th>
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
