import React, { Component, Fragment } from "react";

import Header from "../../Components/Header/Header.js";

import "./Contact.scss";

class Apropos extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <div className="contactPageWrap">
          <h1>Je suis Contact</h1>
        </div>
      </Fragment>
    );
  }
}

export default Apropos;
