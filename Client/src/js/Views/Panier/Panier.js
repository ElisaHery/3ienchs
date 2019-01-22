import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { AddPanier, AddPricePanier, DeleteFromPanier } from "./../../actions";

import Header from "../../Components/Header/Header.js";
import Footer from "../../Components/Footer/Footer.js";

import "./Panier.scss";
import { get } from "https";

const mapDispatchToProps = dispatch => {
  return {
    AddPanier: (product, bool) => dispatch(AddPanier(product, bool)),
    AddPricePanier: product => dispatch(AddPricePanier(product)),
    DeleteFromPanier: product => dispatch(DeleteFromPanier(product))
  };
};

const mapStateToProps = state => {
  return {
    articlesPanier: state.articlesPanier
  };
};

class PanierClass extends Component {
  handleUpdateQty(event, biere) {
    // console.log(event.target);

    if (isNaN(event.target.value)) {
      console.log(event.target);
      event.target.setAttribute("class", "isHidden");
      const inputToShow = document.getElementsByName(biere);
      inputToShow.forEach(e => e.classList.remove("isHidden"));
    } else {
      const changePanier = { typeBiere: biere, quantity: +event.target.value };
      this.props.AddPanier(changePanier, true);
    }
  }

  handleUpdateFormQty(event, biere) {
    event.preventDefault();
    const newPanier = {
      typeBiere: biere,
      quantity: +event.target.children[0].value
    };
    this.props.AddPanier(newPanier, true);
  }

  handleDelete(e, productToDelete) {
    console.log("yo");
    this.props.DeleteFromPanier(productToDelete);
  }

  priceUnder6 = (number1, number2) => {
    const prix = number1 * number2;
    return prix.toFixed(2);
  };

  isMultiple = (number1, number2) => {
    var remainder = number1 % number2;
    if (remainder == 0) {
      //x is a multiple of y
    } else {
      //x is not a multiple of y
    }
  };

  //si le nombre de bière est un multiple de 6 ou 24 (les packs en promo) alors on multiple le nombre de pack par le prix du pack
  priceWithoutModulo = (clientQty, packQty, packPrice) => {
    const prix = (clientQty / packQty) * packPrice;
    return prix.toFixed(2);
  };

  //on calcule le nombre de pack
  priceWithModulo = (clientQty, packQty, packPrice, unitePrice) => {
    const remainder = clientQty % packQty;
    const prix =
      ((clientQty - remainder) / packQty) * packPrice + remainder * unitePrice;
    return prix.toFixed(2);
  };

  calculatePrice = (clientQty, unitePrice, packable, typeBiere) => {
    const pack6Price = 15;
    const pack24Price = 55.2;
    // si moins de 6 bières, elles sont calculées à l'unité
    if (clientQty < 6) {
      const prix = (clientQty * unitePrice).toFixed(2);
      this.props.AddPricePanier({ biere: typeBiere, totalPrice: +prix });
      return prix;
    } else {
      // si plus de 6 bières, on détermine si elles sont packables ou non
      if (packable === 1) {
        //si on a entre 6 et 24 bières, on détermine si c'est un multiple de 6 ou non et on applique la fonction correspondante
        if (clientQty < 24) {
          if (clientQty % 6 === 0) {
            return this.priceWithoutModulo(clientQty, 6, pack6Price);
          } else {
            return this.priceWithModulo(clientQty, 6, pack6Price, unitePrice);
          }
          // si on a plus de 24bières on fait la même chose avec les multiples de 24
        } else {
          //si multiple de 24
          const remainderFrom24 = clientQty % 24;
          const clientQtyLessremainder = clientQty - remainderFrom24;
          if (remainderFrom24 === 0) {
            return this.priceWithoutModulo(clientQty, 24, pack24Price);
            // si pas multiple de 24 et que le reste est supérieur à 6 (= on doit appliquer les promo sur le reste)
          } else if (remainderFrom24 > 5) {
            if (remainderFrom24 % 6 === 0) {
              const prix =
                +this.priceWithoutModulo(
                  clientQtyLessremainder,
                  24,
                  pack24Price
                ) + +this.priceWithoutModulo(remainderFrom24, 6, pack6Price);
              return prix.toFixed(2);
            } else {
              const prix =
                +this.priceWithoutModulo(
                  clientQtyLessremainder,
                  24,
                  pack24Price
                ) +
                +this.priceWithModulo(
                  remainderFrom24,
                  6,
                  pack6Price,
                  unitePrice
                );

              return prix.toFixed(2);
            }
            //si pas multiple de 24 et que le reste est inférieur à 6
          } else {
            return this.priceWithModulo(clientQty, 24, pack24Price, unitePrice);
          }
        }
        // si elles ne sont pas packables c'est facile car les promos ne s'appliquent pas ==> on revient à un calcul à l'unité
      } else {
        const prix = clientQty * unitePrice;
        return prix.toFixed(2);
      }
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
                      {this.calculatePrice(
                        article.quantity,
                        article.unitePrice,
                        article.packable,
                        article.typeBiere
                      )}
                      €
                    </p>
                  </div>
                  <div className="ligne_blanche_courte" />
                </div>
              ))}

              {/* <div className="ligne_blanche_courte total" />
              <div>
                <p>total</p>
                <p>total</p>
              </div> */}
            </div>
          </section>
          <Footer />
        </div>
      </Fragment>
    );
  }
}

const Panier = connect(
  mapStateToProps,
  mapDispatchToProps
)(PanierClass);
export default Panier;
