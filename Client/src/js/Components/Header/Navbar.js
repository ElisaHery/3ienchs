import React, { Component } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

import Burger from "./BurgerMenu/Burger.js";
import minilogo from "./../../../assets/logos/3ienchs_logo_blanc.png";
import connexion_icon from "./../../../assets/icones/user_blanc.svg";
import basket from "./../../../assets/icones/basket_blanc.svg";
import "./Navbar.scss";

const mapStateToProps = state => {
  return {
    connectedUser: state.connectedUser,
    userPrenom: state.userPrenom,
    articlesPanier: state.articlesPanier
  };
};

class HeaderClass extends Component {
  render() {
    // const userPrenom = this.props.userPrenom;
    // const connectedUser = this.props.connectedUser;

    // const userPrenom = JSON.parse(localStorage.getItem("user"));
    let userPrenom;
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (user) {
      userPrenom = user.user_prenom;
    }

    const connectedUser = JSON.parse(
      localStorage.getItem("connectedUser") || this.props.connectedUser
    );

    // console.log("user connecté ?", connectedUser);
    // console.log("son prénom ==>", userPrenom);

    // console.log(this.props.articlesPanier);
    // Calcule le nombre total de bières dans le panier
    let totalQty = 0;
    this.props.articlesPanier.forEach(element => {
      totalQty += element.quantity;
    });

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
                  className="userIcon"
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
                <img src={basket} className="basketIcon" alt="panier_icon" />{" "}
              </Link>
            </li>
          </ul>
        </div>
        {this.props.articlesPanier.length > 0 && (
          <Link to="/panier">
            <div className="articlesQty">{totalQty}</div>
          </Link>
        )}
      </nav>
    );
  }
}

export default connect(mapStateToProps)(HeaderClass);
