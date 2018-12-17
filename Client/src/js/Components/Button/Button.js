import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Button.scss";

class Button extends Component {
  state = {};
  render() {
    return (
      <Link to={this.props.path}>
        <div
          className={this.props.class}
          style={{
            color: this.props.scriptColor,
            margin: this.props.margin
          }}
        >
          {" "}
          {this.props.text}
        </div>
      </Link>
    );
  }
}

export default Button;
