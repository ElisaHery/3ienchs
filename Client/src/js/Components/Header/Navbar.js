import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

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
              <NavLink to="/">
                <img src={minilogo} className="minilogo" alt="logo_iench" />{" "}
              </NavLink>
            </li>
            <li className="li_left">
              <NavLink exact activeClassName="isActive" to="/">
                Accueil
              </NavLink>
            </li>
            <li className="li_left">
              <NavLink exact activeClassName="isActive" to="/bieres">
                Nos bières
              </NavLink>
            </li>
            <li className="li_left">
              <NavLink exact activeClassName="isActive" to="/apropos">
                À propos
              </NavLink>
            </li>
            <li className="li_left">
              <NavLink exact activeClassName="isActive" to="/vente">
                Points de vente
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="spacer" />
        <div>
          <ul>
            <li>
              <NavLink to="/login">
                <img
                  src={connexion_icon}
                  className="userIcon"
                  alt="connexion_icon"
                />{" "}
              </NavLink>
            </li>
            {/* <li className="li_right">
            <Link to="/login">Connexion</Link>
          </li> */}
            {connectedUser ? (
              <li className="li_right">
                <NavLink exact activeClassName="isActive" to="/login">
                  {" "}
                  {userPrenom}{" "}
                </NavLink>
              </li>
            ) : (
              <li className="li_right">
                <NavLink exact activeClassName="isActive" to="/login">
                  Connexion
                </NavLink>
              </li>
            )}
            <li className="li_right">
              <NavLink exact activeClassName="isActive" to="/panier">
                <img src={basket} className="basketIcon" alt="panier_icon" />{" "}
              </NavLink>
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
