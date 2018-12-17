import React, { Component, Fragment } from "react";

import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Button from "../../Components/Button/Button";
import SocialMedias from "../../Components/SocialMedias/SocialMedias";
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

  componentDidMount() {
    // this.callApi(PathToBack + "bieres")
    //   .then(res => {
    //     console.log(res);
    //     this.setState({ response: res });
    //   })
    //   // .then(console.log(this.state.response))
    //   .catch(err => console.log(err));
  }

  // callApi = async url => {
  //   const response = await fetch(url);
  //   const body = await response.json();
  //   if (response.status !== 200) throw Error(body.message);
  //   // console.log(body);
  //   return body;
  // };

  // handleSubmit = async e => {
  //   e.preventDefault();
  //   const response = await fetch("/api/world", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({ post: this.state.post })
  //   });
  //   const body = await response.text();
  //   this.setState({ responseToPost: body });
  // };

  render() {
    // if (this.state.response.length === 0) return null;
    // console.log(this.state.response);

    return (
      <Fragment>
        <Header className="App-header" />

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
