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
  state = {
    typeBiere: this.props.name,
    quantity: 0,
    unitePrice: this.props.price,
    packable: this.props.packableStatus
  };

  handleChange(event) {
    // console.log(event.target.value);
    this.setState({ quantity: +event.target.value });
  }

  handleClick(event) {
    const articlesPanier = this.state;
    // console.log(articlesPanier);
    // console.log(this.state.value);
    if (articlesPanier.quantity > 0) {
      this.props.AddPanier(articlesPanier);
    }
  }

  render() {
    return (
      <Fragment>
        <div id="biereIndivContainer">
          {/* <img src={this.props.srcImage} alt={this.props.name} /> */}

          <article className="contain">
            <div className="main une">
              <div className="avant">
                <figure>
                  <img src={this.props.srcImage} alt={this.props.name} />
                </figure>
              </div>
              <div
                className="arr"
                // style={{
                //   backgroundImage: `url(${this.props.srcImage})`,
                //   filter: "grayscale(100%)",

                //   backgroundSize: "cover"
                // }}
              >
                <p>
                  {this.props.descr} <br />
                  <br />
                  {this.props.degre} %Alc <br />
                  <br />
                  {this.props.IBU} IBU • {this.props.EBC} EBC
                </p>
              </div>
            </div>
          </article>

          <h2>{this.props.name}</h2>
          <h3>{this.props.type}</h3>

          <div className="descr_responsive_container">
            <p className="descr_responsive">{this.props.descr}</p>
            <p className="descr_responsive">{this.props.degre} %Alc</p>
            <p className="descr_responsive">
              {" "}
              {this.props.IBU} IBU • {this.props.EBC} EBC
            </p>
          </div>
          <div className="input_container">
            <input type="number" min="0" onChange={e => this.handleChange(e)} />
            <button className="add_button" onClick={e => this.handleClick(e)}>
              Ajouter au panier
            </button>
          </div>
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
