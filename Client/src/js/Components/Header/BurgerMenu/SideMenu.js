import React from "react";
import { NavLink } from "react-router-dom";
import "./SideMenu.scss";

const SideMenu = props => {
  let MenuClasses = "sidemenu";
  if (props.show) {
    MenuClasses = "sidemenu open";
  }
  return (
    <nav className={MenuClasses}>
      <ul>
        <li className="li_left">
          <NavLink
            exact
            activeClassName="isActive"
            to="/"
            style={{ cursor: "pointer" }}
          >
            <span>Accueil</span>
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
        <li className="li_left">
          <NavLink exact activeClassName="isActive" to="/login">
            Connexion
          </NavLink>
        </li>
        <li className="li_left">
          <NavLink exact activeClassName="isActive" to="/panier">
            Panier
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default SideMenu;
