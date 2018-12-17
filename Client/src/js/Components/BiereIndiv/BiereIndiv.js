import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { AddPanier } from "./../../actions";
import "./BiereIndiv.scss";

const mapDispatchToProps = dispatch => {
  return {
    AddPanier: article => dispatch(AddPanier(article))
  };
};

const mapStateToProps = state => {
  return {
    articles: {
      articlesPanier: state.articlesPanier
    }
  };
};

class BiereIndivClass extends Component {
  constructor(props) {
    super(props);
    this.state = { typeBiere: this.props.name, value: 0 };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleClick(event) {
    const articlesPanier = this.state;
    // console.log(this.state.value);
    this.props.AddPanier(articlesPanier);
  }

  render() {
    return (
      <Fragment>
        <div id="biereIndivContainer">
          <img src={this.props.srcImage} />
          <h1>{this.props.name}</h1>
          <h2>{this.props.type}</h2>
          <p>{this.props.descr}</p>

          <input type="number" onChange={this.handleChange} />
          <button onClick={this.handleClick}>ajouter au panier</button>
        </div>
      </Fragment>
    );
  }
}

//on connecte la classe avec le mapDisptachToProps
const BiereIndiv = connect(
  mapStateToProps,
  mapDispatchToProps
)(BiereIndivClass);
export default BiereIndiv;
