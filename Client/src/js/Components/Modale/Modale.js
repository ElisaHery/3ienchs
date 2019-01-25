import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

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
      <section className="mask">
        <div className="modale">
          <p>Voulez-vous valider votre panier ?</p>
        </div>
      </section>
    );
  }
}

const Modale = connect(mapStateToProps)(ModaleClass);

export default Modale;
