import React from "react";
import { Link } from "react-router-dom";
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
        <li className="li_left">
          <Link to="/login">Connexion</Link>
        </li>
        <li className="li_left">
          <Link to="/">Panier</Link>
        </li>
      </ul>
    </nav>
  );
};

export default SideMenu;
