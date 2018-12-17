import React, { Component, Fragment } from "react";
import "./Footer.scss";

class Footer extends Component {
  state = {};
  render() {
    return (
      <Fragment>
        <section id="footer">
          <div className="pfooter">
            <h3> ADRESSE</h3>
            <p>
              48 rue Elias Howe <br /> 94100 Saint-Maur-des-Fossés
            </p>
          </div>
          <div className="pfooter">
            <h3> CONTACT</h3>
            <p>
              contact@3ienchs.com <br />
              06.65.46.94.02
            </p>
          </div>
          <div className="pfooter">
            <h3>HORAIRES</h3>
            <p>
              JEUDI et VENDREDI <br />
              17h - 20h
            </p>
          </div>
        </section>
      </Fragment>
    );
  }
}

export default Footer;
