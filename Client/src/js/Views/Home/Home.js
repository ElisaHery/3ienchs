import React, { Component, Fragment } from "react";

import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Button from "../../Components/Button/Button";
import SocialMedias from "../../Components/SocialMedias/SocialMedias";
import SideMenu from "../../Components/Header/BurgerMenu/SideMenu";
import Backdrop from "../../Components/Header/BurgerMenu/Backdrop.js";
// import PathToBack from "../../PathToBack";

import Logo from "./../../../assets/logos/3ienchs_baseline.png";
import BigDaddy from "./../../../assets/images/bigdaddy1.jpg";

import "./Home.scss";

class App extends Component {
  state = {
    response: [],
    post: "",
    responseToPost: ""
  };

  render() {
    let backdrop;

    if (this.state.sideMenuOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />;
    }
    return (
      <Fragment>
        <Header
          className="App-header"
          burgerClickHandler={this.burgerToggleClickHandler}
        />
        <SideMenu show={this.state.sideMenuOpen} />
        {backdrop}

        <section id="page_accueil">
          <p>
            48 rue Elias Howe, 94100 Saint-Maur-des-Fossés | Ouvert le Jeudi et
            le Vendredi de 17:00 à 20:00
          </p>
          <figure className="FigureHomeLogo">
            <img src={Logo} alt="" />
          </figure>
          <Button
            path="/bieres"
            margin="30px auto 60px auto"
            text="NOS BIERES"
            class="button white"
          />
          <SocialMedias />
          <section id="homeSecondPart">
            <figure className="FigureHomeBigDaddy">
              <img src={BigDaddy} alt="" />
            </figure>

            <div id="textRight">
              <h1>DECOUVREZ NOS RECETTES</h1>
              <p>
                Toutes nos recettes sont élaborées avec la playlist adéquate. De
                quoi donner à nos bières un bon goût de rock!
              </p>
              <Button
                path="/bieres"
                // scriptColor="black"
                margin="30px auto 60px auto"
                text="NOS BIERES"
                class="button black"
              />
            </div>
          </section>
        </section>
        <Footer />
      </Fragment>
    );
  }
}

export default App;
