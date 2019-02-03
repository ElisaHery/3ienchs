import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./Views/Home/Home.js";
import Bieres from "./Views/Bieres/Bieres.js";
import Apropos from "./Views/Apropos/Apropos.js";
import Panier from "./Views/Panier/Panier.js";
import Login from "./Views/Login/Login.js";
import Contact from "./Views/Contact/Contact.js";
import MentionsLegales from "./Views/MentionsLegales/MentionsLegales.js";
import Vente from "./Views/Pointsvente/Vente.js";

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
            <Route path="/vente" component={Vente} />
            <Route path="/panier" component={Panier} />
            <Route path="/login" component={Login} />
            <Route path="/contact" component={Contact} />
            <Route path="/mentionslegales" component={MentionsLegales} />
          </Switch>
        </Router>
      </Fragment>
    );
  }
}

export default App;
