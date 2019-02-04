import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import fr from "date-fns/locale/fr";
import Moment from "react-moment";

import { connect } from "react-redux";
import {
  AddPanier,
  AddPricePanier,
  DeleteFromPanier,
  DeleteWholePanier
} from "./../../actions";

import Header from "../../Components/Header/Header.js";
import Footer from "../../Components/Footer/Footer.js";
import Modale from "../../Components/Modale/Modale.js";
import PathToBack from "../../PathToBack";

import "./Panier.scss";

registerLocale("fr", fr);

const mapDispatchToProps = dispatch => {
  return {
    AddPanier: (product, bool) => dispatch(AddPanier(product, bool)),
    AddPricePanier: product => dispatch(AddPricePanier(product)),
    DeleteFromPanier: product => dispatch(DeleteFromPanier(product)),
    DeleteWholePanier: () => dispatch(DeleteWholePanier())
  };
};

const mapStateToProps = state => {
  return {
    articlesPanier: state.articlesPanier,
    connectedUser: state.connectedUser
  };
};

class PanierClass extends Component {
  state = {
    afficherConnexionMessage: false,
    afficherModale: false,
    dateHeureRecup: new Date()
  };

  // registerLocale("en-GB", enGB);
  callApi = async (url, corps) => {
    const response = await fetch(url, corps);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  addHours = (initial, h) => {
    initial.setHours(initial.getHours() + h);
    return initial;
  };

  disableDate = date => {
    return date.getDay() === 4 || date.getDay() === 5;
  };

  handleDate = date => {
    this.setState({
      dateHeureRecup: date
    });
  };

  //met à jour la quantité avec le select (1 à 10 bières)
  handleUpdateQty(event, biere) {
    if (isNaN(event.target.value)) {
      console.log(event.target);
      event.target.setAttribute("class", "isHidden");
      const inputToShow = document.getElementsByName(biere);
      inputToShow.forEach(e => e.classList.remove("isHidden"));
      console.log(inputToShow);
    } else {
      const changePanier = { typeBiere: biere, quantity: +event.target.value };
      this.props.AddPanier(changePanier, true);
      // this.updateTotalprice();
    }
  }
  //met à jour la qté avec l'input number (plus de10 bières)
  handleUpdateFormQty(event, biere) {
    event.preventDefault();
    const newPanier = {
      typeBiere: biere,
      quantity: +event.target.children[0].value
    };
    this.props.AddPanier(newPanier, true);
    console.log("quand on valide l'input", event.target);
    event.target.setAttribute("class", "isHidden");
    // this.updateTotalprice();
  }

  //suppression d'un produit
  handleDelete(e, productToDelete) {
    this.props.DeleteFromPanier(productToDelete);
    // this.updateTotalprice();
  }

  //calcule le total du panier
  calculTotalPanier = () => {
    let totalPanier = 0;
    this.props.articlesPanier.forEach(element => {
      totalPanier += element.totalPrice;
    });
    return +totalPanier.toFixed(2);
  };

  //gère le clic sur "commander"
  handleValiderPanier = () => {
    // console.log(this.props.articlesPanier);
    let connectedUser = JSON.parse(localStorage.getItem("connectedUser"));

    // console.log(connectedUser);
    if (!connectedUser) {
      this.setState({ afficherConnexionMessage: true });
    } else {
      this.setState({ afficherConnexionMessage: false });
      this.setState({ afficherModale: true });
      document.body.classList.add("noscroll-class");
    }
  };

  // gère la validation de la commande
  validateCommande = () => {
    document.body.classList.remove("noscroll-class");
    let user = JSON.parse(localStorage.getItem("user"));
    const totalPrice = this.calculTotalPanier();
    const dateHeureRecup = this.addHours(this.state.dateHeureRecup, 1);
    console.log(dateHeureRecup);
    const data = {
      id_user: user.user_id,
      dateheure_recup: dateHeureRecup,
      cmd_prix: totalPrice,
      cmd_over: 0,
      panier: this.props.articlesPanier
    };
    // On poste dans commandes avec IDuser et date_heure_récup, et ensuite dans le fichier DB on récupère l'ID
    // commandes et on poste les détails de la commande (qté et ID produit qu'on aura en faisant un join)
    const fetch_param = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data)
    };
    this.callApi(`${PathToBack}commande`, fetch_param)
      .then(response => {
        console.log(response);
        this.props.DeleteWholePanier();
        this.props.history.push("/login");
      })

      .catch(err => {
        console.log(err);
        this.setState({ error: true, errorMessage: err.message });
      });
  };

  // retour au panier
  backToPanier = () => {
    this.setState({ afficherConnexionMessage: false });
    this.setState({ afficherModale: false });
    document.body.classList.remove("noscroll-class");
  };

  render() {
    var date = new Date();
    return (
      <Fragment>
        <Header />
        <div className="panierPageWrap">
          <h1>Mon Panier</h1>
          {/* <p className="p_professionnel">
            Professionel ? <Link to="/contact">Contactez-nous</Link> pour un
            service personnalisé
          </p> */}

          <section className="mainPanier">
            <div className="leftPanier">
              <h2>Produits</h2>

              <div className="ligne_rose" />

              {this.props.articlesPanier.length === 0 ? (
                <p>
                  Vous n'avez rien dans votre panier. Découvrez nos produits{" "}
                  <Link to="/bieres">ici ! </Link>{" "}
                </p>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Produit</th>
                      <th>Quantité</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.articlesPanier.map(article => (
                      <tr key={article.typeBiere}>
                        <td>
                          {article.typeBiere}{" "}
                          <i
                            className="far fa-trash-alt"
                            onClick={e =>
                              this.handleDelete(e, article.typeBiere)
                            }
                          />{" "}
                        </td>
                        <td>
                          {article.quantity < 10 ? (
                            <select
                              placeholder={article.quantity}
                              value={article.quantity}
                              onChange={e =>
                                this.handleUpdateQty(e, article.typeBiere)
                              }
                            >
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                              <option value="6">6</option>
                              <option value="7">7</option>
                              <option value="8">8</option>
                              <option value="9">9</option>
                              <option value="10+">10 ou +</option>
                            </select>
                          ) : (
                            <form
                              onSubmit={e =>
                                this.handleUpdateFormQty(e, article.typeBiere)
                              }
                            >
                              <input
                                type="number"
                                min="0"
                                placeholder={article.quantity}
                                name={article.typeBiere}
                              />
                              <input
                                value="ok"
                                type="submit"
                                name={article.typeBiere}
                              />
                            </form>
                          )}

                          <form
                            onSubmit={e =>
                              this.handleUpdateFormQty(e, article.typeBiere)
                            }
                          >
                            <input
                              type="number"
                              className="isHidden"
                              name={article.typeBiere}
                              min="0"
                              placeholder={article.quantity}
                            />
                            <input
                              value="ok"
                              type="submit"
                              className="isHidden"
                              name={article.typeBiere}
                            />
                          </form>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            <div className="rightPanier">
              <h2>Ma commande</h2>
              <div className="ligne_blanche" />
              {this.props.articlesPanier.map(article => (
                <div key={article.typeBiere}>
                  <div className="flex_right_panier">
                    <p>
                      {article.quantity} x {article.typeBiere}
                    </p>

                    <p>{article.totalPrice}€</p>
                  </div>
                  <div className="ligne_blanche_courte" />
                </div>
              ))}

              {this.calculTotalPanier() > 0 && (
                <div>
                  <div className="ligne_blanche_courte" />
                  <div className="flex_right_panier">
                    <p>TOTAL </p>
                    <p>{this.calculTotalPanier()}€</p>
                  </div>{" "}
                  <div className="flex_col">
                    <p className="italique">
                      Nous ne livrons pas encore à domicile ! <br />
                      Choisissez un moment pour venir retirer et régler votre
                      commande à la brasserie: <br /> <br />
                      (ouverture les jeudi et vendredi de 17h à 20h)
                    </p>

                    <DatePicker
                      selected={this.state.dateHeureRecup}
                      onChange={this.handleDate}
                      showTimeSelect
                      minTime={new Date().setHours(17)}
                      maxTime={new Date().setHours(20)}
                      dateFormat="dd/MM/yyyy - HH:mm"
                      timeFormat="HH:mm"
                      filterDate={this.disableDate}
                      locale="fr"
                    />
                    <button
                      className="validateButton"
                      onClick={e => this.handleValiderPanier(e)}
                    >
                      {" "}
                      Commander{" "}
                    </button>
                    {this.state.afficherConnexionMessage && (
                      <p>
                        Vous devez <Link to="/login">vous connecter</Link> pour
                        continuer!
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </section>
          <Footer />
        </div>
        {this.state.afficherModale && (
          <Modale
            validateCommande={e => this.validateCommande(e)}
            backToPanier={e => this.backToPanier(e)}
          />
        )}
      </Fragment>
    );
  }
}

const Panier = connect(
  mapStateToProps,
  mapDispatchToProps
)(PanierClass);
export default Panier;
