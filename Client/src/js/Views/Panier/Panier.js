import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { AddPanier } from "./../../actions";

import Header from "../../Components/Header/Header.js";
import Footer from "../../Components/Footer/Footer.js";

import "./Panier.scss";
import { get } from "https";

const mapDispatchToProps = dispatch => {
  return {
    AddPanier: (product, bool) => dispatch(AddPanier(product, bool))
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

    const changePanier = {
      typeBiere: biere,
      quantity: +event.target.children[0].value
    };
    this.props.AddPanier(changePanier, true);
  }

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
                        <td>{article.typeBiere}</td>
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
                            <i class="far fa-trash-alt" />{" "}
                          </form>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            <div className="rightPanier">
              <h2>Récapitulatif</h2>
              <div className="ligne_blanche" />
              {this.props.articlesPanier.map(article => (
                <div>
                  <div>
                    <p>
                      {article.quantity} x {article.typeBiere}
                    </p>{" "}
                    <p>prix</p>{" "}
                  </div>
                  <div className="ligne_blanche_courte" />
                </div>
              ))}
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
