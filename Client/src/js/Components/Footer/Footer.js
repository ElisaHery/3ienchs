import React, { Component, Fragment } from "react";

import twitter from "./../../../assets/icones/twitter_blanc.png";
import insta from "./../../../assets/icones/insta_blanc.png";
import facebook from "./../../../assets/icones/facebook_blanc.png";
import "./Footer.scss";

class Footer extends Component {
  state = {};
  render() {
    return (
      <Fragment>
        <section id="footer">
          <div className="firstPartFooter">
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

            <div className="pfooter">
              <h3>LISTE DE DIFFUSION</h3>
              <p>
                <span className="italic">Coming soon !</span>
              </p>
              <form>
                <input type="text" placeholder="adresse email" />
                <button>S'abonner</button>
              </form>
            </div>
          </div>
          <div className="secondPartFooter">
            {/* <div className="whiteLine" /> */}

            <section id="socialMedias">
              <a
                href="https://twitter.com/3ienchs"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={twitter} className="SMicon" alt="logoTwitter" />
              </a>
              <a
                href="https://www.facebook.com/3ienchs/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={facebook} className="SMicon" alt="logoFacebook" />
              </a>
              <a
                href="https://www.instagram.com/3ienchs/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={insta} className="SMicon" alt="logoInstagram" />
              </a>
            </section>

            <a href="/mentionslegales">© mentions légales</a>
          </div>
        </section>
      </Fragment>
    );
  }
}

export default Footer;
