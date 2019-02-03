import React, { Component, Fragment } from "react";

import Header from "../../Components/Header/Header.js";
import Footer from "../../Components/Footer/Footer";
// import SocialMedias from "../../Components/SocialMedias/SocialMedias";
// import Rockerbiere from "./../../../assets/images/rockerbiere.jpg";
// import TomThib from "./../../../assets/images/TomThib.jpg";

import "./MentionsLegales.scss";

class MentionsLegales extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <section id="MentionsLegalesWrap">
          <p>je suis MentionsLegales</p>
        </section>
        <Footer />
      </Fragment>
    );
  }
}

export default MentionsLegales;
