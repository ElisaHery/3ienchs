import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { AddPanier } from "./../../actions";

import Header from "../../Components/Header/Header.js";
import Footer from "../../Components/Footer/Footer.js";

import "./Panier.scss";

const mapDispatchToProps = dispatch => {
  return {
    AddPanier: product => dispatch(AddPanier(product))
  };
};

const mapStateToProps = state => {
  return {
    articlesPanier: state.articlesPanier
  };
};

class PanierClass extends Component {
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
                        <td>{article.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            <div className="rightPanier">
              <h2>Récapitulatif</h2>
              <div className="ligne_blanche" />
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
