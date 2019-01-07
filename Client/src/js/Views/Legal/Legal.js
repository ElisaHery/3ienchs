import React, { Component, Fragment } from "react";

import Header from "../../Components/Header/Header.js";

import "./Legal.scss";

class Legal extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <div className="legalPageWrap">
          <h1>Je suis Legal</h1>
        </div>
      </Fragment>
    );
  }
}

export default Legal;
