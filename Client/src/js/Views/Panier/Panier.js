import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { AddPanier, AddPricePanier, DeleteFromPanier } from "./../../actions";

import Header from "../../Components/Header/Header.js";
import Footer from "../../Components/Footer/Footer.js";
import Modale from "../../Components/Modale/Modale.js";

import "./Panier.scss";

const connectedUser = JSON.parse(
  localStorage.getItem("connectedUser") || this.props.connectedUser
);

const mapDispatchToProps = dispatch => {
  return {
    AddPanier: (product, bool) => dispatch(AddPanier(product, bool)),
    AddPricePanier: product => dispatch(AddPricePanier(product)),
    DeleteFromPanier: product => dispatch(DeleteFromPanier(product))
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
    afficherModale: false
  };

  //met à jour la quantité avec le select
  handleUpdateQty(event, biere) {
    if (isNaN(event.target.value)) {
      console.log(event.target);
      event.target.setAttribute("class", "isHidden");
      const inputToShow = document.getElementsByName(biere);
      inputToShow.forEach(e => e.classList.remove("isHidden"));
    } else {
      const changePanier = { typeBiere: biere, quantity: +event.target.value };
      this.props.AddPanier(changePanier, true);
      // this.updateTotalprice();
    }
  }
  //met à jour la qté avec l'input
  handleUpdateFormQty(event, biere) {
    event.preventDefault();
    const newPanier = {
      typeBiere: biere,
      quantity: +event.target.children[0].value
    };
    this.props.AddPanier(newPanier, true);
    // this.updateTotalprice();
  }

  handleDelete(e, productToDelete) {
    console.log("yo");
    this.props.DeleteFromPanier(productToDelete);
    // this.updateTotalprice();
  }

  calculTotalPanier = () => {
    let totalPanier = 0;
    this.props.articlesPanier.forEach(element => {
      totalPanier += element.totalPrice;
    });
    return +totalPanier.toFixed(2);
  };

  handleValiderPanier = () => {
    if (!connectedUser) {
      this.setState({ afficherConnexionMessage: true });
    } else {
      this.setState({ afficherConnexionMessage: false });
      this.setState({ afficherModale: true });
      document.body.classList.add("noscroll-class");
    }
  };

  render() {
    return (
      <Fragment>
        <Header />
        <div className="panierPageWrap">
          <h1>Mon Panier</h1>
          <p className="p_professionnel">
            Professionel ? <Link to="/contact">Contactez-nous</Link> pour un
            service personnalisé
          </p>

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
                          {" "}
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
                  <div>
                    <p>
                      {article.quantity} x {article.typeBiere}
                    </p>

                    <p>
                      {/* {this.calculatePrice(
                        article.quantity,
                        article.unitePrice,
                        article.packable,
                        article.typeBiere
                      )} */}
                      {article.totalPrice}€
                    </p>
                  </div>
                  <div className="ligne_blanche_courte" />
                </div>
              ))}

              {this.calculTotalPanier() > 0 && (
                <div>
                  <div className="ligne_blanche_courte" />
                  <div>
                    <p>TOTAL </p>
                    <p>{this.calculTotalPanier()}€</p>
                  </div>{" "}
                  <div className="flex_col">
                    <p className="italique">
                      Commande à emporter et à régler sur place
                    </p>
                    <button
                      className="validateButton"
                      onClick={e => this.handleValiderPanier(e)}
                    >
                      {" "}
                      Commander{" "}
                    </button>
                    {this.state.afficherConnexionMessage && (
                      <p>Vous devez vous connecter pour continuer!</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </section>
          <Footer />
        </div>
        {this.state.afficherModale && <Modale />}
      </Fragment>
    );
  }
}

const Panier = connect(
  mapStateToProps,
  mapDispatchToProps
)(PanierClass);
export default Panier;
