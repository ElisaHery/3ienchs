import React, { Component, Fragment } from "react";

import Header from "../../Components/Header/Header.js";
import Footer from "../../Components/Footer/Footer";
import SocialMedias from "../../Components/SocialMedias/SocialMedias";

import "./Vente.scss";

class Vente extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <div className="VentePageWrap">
          <h1>Où trouver la 3ienchs ?</h1>
          <div className="ligne_rose" />
          <iframe
            src="https://www.google.com/maps/d/embed?mid=1xMoZxGUwH__zvvX64NaT7768-B0fCmkx"
            width="640"
            height="480"
          />
        </div>
        <SocialMedias />

        <Footer />
      </Fragment>
    );
  }
}

export default Vente;
