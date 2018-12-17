import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import "./SocialMedias.scss";
import twitter from "./../../../assets/icones/twitter.svg";
import insta from "./../../../assets/icones/insta.svg";
import facebook from "./../../../assets/icones/facebook.svg";

class SocialMedias extends Component {
  render() {
    return (
      <Fragment>
        <div id="socialMediasContainer">
          <a href="https://twitter.com/3ienchs" target="_blank">
            <img src={twitter} className="SMicon" />
          </a>
          <a href="https://www.facebook.com/3ienchs/" target="_blank">
            <img src={facebook} className="SMicon" />
          </a>
          <a href="https://www.instagram.com/3ienchs/" target="_blank">
            <img src={insta} className="SMicon" />
          </a>
        </div>
      </Fragment>
    );
  }
}

export default SocialMedias;
