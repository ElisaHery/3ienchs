import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./Views/Home/Home.js";
import Bieres from "./Views/Bieres/Bieres.js";
import Apropos from "./Views/Apropos/Apropos.js";
import Panier from "./Views/Panier/Panier.js";
import Login from "./Views/Login/Login.js";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Fragment>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/bieres" component={Bieres} />
            <Route path="/apropos" component={Apropos} />
            <Route path="/vente" component={Apropos} />
            <Route path="/panier" component={Panier} />
            <Route path="/login" component={Login} />
          </Switch>
        </Router>
      </Fragment>
    );
  }
}

export default App;
