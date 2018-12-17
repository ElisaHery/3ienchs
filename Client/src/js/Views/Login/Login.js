import React, { Component, Fragment } from "react";

import Header from "../../Components/Header/Header.js";
import Footer from "../../Components/Footer/Footer";
import SocialMedias from "../../Components/SocialMedias/SocialMedias";
import PathToBack from "../../PathToBack";

import "./Login.scss";

class Login extends Component {
  state = {
    mail: "",
    password: "",
    error: false,
    errorMessage: ""
  };

  callApi = async (url, corps) => {
    const response = await fetch(url, corps);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  handleChange(evt) {
    console.log(evt.target.value);
    this.setState({ [evt.target.name]: evt.target.value });
  }

  loginUser(evt) {
    evt.preventDefault();
    const data = { mail: this.state.mail, password: this.state.password };
    const fetch_param = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data)
    };
    console.log(data);
    this.callApi(`${PathToBack}userLogin`, fetch_param)
      .then(response => {
        // this.forceUpdate();
        console.log(response);
        // window.location.reload();
      })
      .catch(err => console.log(err));
  }
  // this.setState({ error: true, errorMessage: err })

  render() {
    return (
      <Fragment>
        <Header />
        <div className="loginPageWrap">
          <h1>CONNEXION</h1>
          <section className="loginWrap">
            <div className="loginMiniWrap">
              <h2>Déjà inscrit-e ?</h2>
              <form onSubmit={e => this.loginUser(e)}>
                <input
                  type="text"
                  placeholder="email"
                  name="mail"
                  onChange={e => this.handleChange(e)}
                />
                <input
                  type="text"
                  name="password"
                  placeholder="mot de passe"
                  onChange={e => this.handleChange(e)}
                />
                <input type="submit" />
              </form>

              {this.state.error && <p>yo --> {this.state.errorMessage}</p>}
            </div>
            <div className="loginMiniWrap">
              <h2>Créez votre compte</h2>
            </div>
          </section>
        </div>
        <Footer />
        <SocialMedias />
      </Fragment>
    );
  }
}

export default Login;
