import React, { Component } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

import Burger from "../BurgerMenu/Burger.js";
import minilogo from "./../../../assets/logos/3ienchs_logo_blanc.png";
import connexion_icon from "./../../../assets/icones/user_blanc.svg";
import basket from "./../../../assets/icones/basket_blanc.svg";
import "./Header.scss";

const mapStateToProps = state => {
  return {
    filters: {
      connectedUser: state.connectedUser,
      userPrenom: state.userPrenom
    }
  };
};

class HeaderClass extends Component {
  render() {
    const userPrenom = this.props.filters.userPrenom;
    const connectedUser = this.props.filters.connectedUser;

    return (
      <nav className="navigation">
        <div className="bugerIconContainer">
          <Burger click={this.props.burgerClickHandler} />
        </div>
        <div>
          <ul>
            <li className="li_left">
              <Link to="/">
                <img src={minilogo} className="minilogo" alt="logo_iench" />{" "}
              </Link>
            </li>
            <li className="li_left">
              {" "}
              <Link to="/" style={{ cursor: "pointer" }}>
                <span>Accueil</span>
              </Link>
            </li>
            <li className="li_left">
              <Link to="/bieres">Nos bières</Link>
            </li>
            <li className="li_left">
              <Link to="/apropos">À propos</Link>
            </li>
            <li className="li_left">
              <Link to="/vente">Points de vente</Link>
            </li>
          </ul>
        </div>
        <div className="spacer" />
        <div>
          <ul>
            <li>
              <Link to="/login">
                <img
                  src={connexion_icon}
                  className="right_icons"
                  alt="connexion_icon"
                />{" "}
              </Link>
            </li>
            {/* <li className="li_right">
            <Link to="/login">Connexion</Link>
          </li> */}
            {connectedUser ? (
              <li className="li_right">
                <Link to="/login"> {userPrenom} </Link>
              </li>
            ) : (
              <li className="li_right">
                <Link to="/login">Connexion</Link>
              </li>
            )}
            <li className="li_right">
              <Link to="/panier">
                <img src={basket} className="right_icons" alt="panier_icon" />{" "}
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default connect(mapStateToProps)(HeaderClass);
