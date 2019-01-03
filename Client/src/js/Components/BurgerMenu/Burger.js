import React, { Component } from "react";
import "./Burger.scss";

class Burger extends Component {
  test() {
    console.log("coucou");
  }
  render() {
    return (
      <button className="toggle-button" onClick={this.props.click}>
        <div className="toggle-button__line" />
        <div className="toggle-button__line" />
        <div className="toggle-button__line" />
      </button>
    );
  }
}

export default Burger;
