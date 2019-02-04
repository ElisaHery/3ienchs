import React, { Component, Fragment } from "react";

import Header from "../../Components/Header/Header.js";
import Footer from "../../Components/Footer/Footer";
import SocialMedias from "../../Components/SocialMedias/SocialMedias";
import BiereIndiv from "../../Components/BiereIndiv/BiereIndiv";

// import Button from "../../Components/Button/Button";
import PathToBack from "../../PathToBack";
import "./Bieres.scss";

class Bieres extends Component {
  state = {
    classicBieres: [],
    specialsBieres: []
  };

  componentDidMount() {
    this.callApi(PathToBack + "classicbieres")
      .then(res => {
        // console.log(res);
        this.setState({ classicBieres: res });
      })
      .catch(err => console.log(err));

    this.callApi(PathToBack + "specialsbieres")
      .then(res => {
        // console.log(res);
        this.setState({ specialsBieres: res });
      })
      .catch(err => console.log(err));
  }

  callApi = async url => {
    const response = await fetch(url);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    // console.log(body);
    return body;
  };

  render() {
    if (this.state.classicBieres.length === 0) return null;
    // console.log(this.state.response);
    return (
      <Fragment>
        <Header />
        <section id="pageBieres">
          <div id="bieresFirstPart">
            <p>
              48 rue Elias Howe, 94100 Saint-Maur-des-Fossés | Ouvert le Jeudi
              et le Vendredi de 17:00 à 20:00
            </p>
            <h1>NOS BIERES</h1>
            <h2>
              Découvrez nos différentes recettes, brassées avec amour et
              rock'n'roll
            </h2>
          </div>
          <section id="bieresSecondPart">
            <h2 className="title-bieres">LES CLASSIQUES</h2>
            <div className="bieres_vignettes">
              {this.state.classicBieres.map(e =>
                e.stock < 50 ? (
                  <BiereIndiv
                    name={e.nom}
                    srcImage={e.img}
                    key={e.biere_id}
                    id={e.biere_id}
                    type={e.type}
                    descr={e.descr}
                    degre={e.degre}
                    IBU={e.IBU}
                    EBC={e.EBC}
                    price={e.prixHT}
                    packableStatus={e.packable}
                    indisponible={true}
                  />
                ) : (
                  <BiereIndiv
                    name={e.nom}
                    srcImage={e.img}
                    key={e.biere_id}
                    id={e.biere_id}
                    type={e.type}
                    descr={e.descr}
                    degre={e.degre}
                    IBU={e.IBU}
                    EBC={e.EBC}
                    price={e.prixHT}
                    packableStatus={e.packable}
                  />
                )
              )}
            </div>
            <h2 className="title-bieres">LES SPECIALES</h2>
            <div className="bieres_vignettes">
              {this.state.specialsBieres.length === 0 ? (
                <p>Pas de bières spéciales pour le moment!</p>
              ) : (
                this.state.specialsBieres.map(e => (
                  <BiereIndiv
                    name={e.nom}
                    srcImage={e.img}
                    key={e.biere_id}
                    id={e.biere_id}
                    type={e.type}
                    descr={e.descr}
                    degre={e.degre}
                    IBU={e.IBU}
                    EBC={e.EBC}
                    price={e.prixHT}
                    packableStatus={e.packable}
                  />
                ))
              )}
            </div>
          </section>
          <section id="bieresTarifs">
            <h1>TARIFS</h1>
            <p className="pTarifs">Bière à l'unité : 3€</p>
            <p className="pTarifs">6 bières classiques: 15€</p>
            <p className="pTarifs">24 bières classiques: 55,20€</p>
            {/* <p className="pTarifs">Bières spéciales : </p> */}
            <p className="pVariete">
              Les bières spéciales restent à 3€ l'unité peu importe la quantité
              commandée{" "}
            </p>
          </section>
        </section>
        <SocialMedias />

        <Footer />
      </Fragment>
    );
  }
}

export default Bieres;
