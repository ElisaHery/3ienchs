import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./Modale.scss";

const mapStateToProps = state => {
  return {
    articles: {
      articlesPanier: state.articlesPanier
    }
  };
};

class ModaleClass extends Component {
  state = {};

  render() {
    return (
      <section className="mask" onClick={this.props.backToPanier}>
        <div className="modale">
          <p>Voulez-vous valider votre panier ?</p>
          <section>
            <button onClick={this.props.validateCommande}>
              Oui, je veux ma bière!{" "}
            </button>

            <button onClick={this.props.backToPanier}>
              Non, je retourne au panier
            </button>
          </section>
        </div>
      </section>
    );
  }
}

const Modale = connect(mapStateToProps)(ModaleClass);

export default Modale;
