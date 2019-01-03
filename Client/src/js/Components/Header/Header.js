import React, { Component, Fragment } from "react";

import Navbar from "./Navbar.js";
import Backdrop from "./BurgerMenu/Backdrop.js";
import SideMenu from "./BurgerMenu/SideMenu.js";

//Composant incluant la barre de navigation et tout le mécanisme du menu burger

class Header extends Component {
  state = { sideMenuOpen: false };

  burgerToggleClickHandler = () => {
    console.log("coucou depuis header.js");
    this.setState(previousState => {
      return { sideMenuOpen: !previousState.sideMenuOpen };
    });
  };

  backdropClickHandler = () => {
    this.setState({ sideMenuOpen: false });
  };

  render() {
    let backdrop;

    if (this.state.sideMenuOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />;
    }
    return (
      <Fragment>
        <Navbar
          className="App-header"
          burgerClickHandler={this.burgerToggleClickHandler}
        />
        <SideMenu show={this.state.sideMenuOpen} />
        {backdrop}
      </Fragment>
    );
  }
}

export default Header;
