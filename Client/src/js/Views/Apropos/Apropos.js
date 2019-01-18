import React, { Component, Fragment } from "react";

import Header from "../../Components/Header/Header.js";
import Footer from "../../Components/Footer/Footer";
import SocialMedias from "../../Components/SocialMedias/SocialMedias";
import Rockerbiere from "./../../../assets/images/rockerbiere.jpg";
import TomThib from "./../../../assets/images/TomThib.jpg";

import "./Apropos.scss";

class Apropos extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <section id="AproposPageWrap">
          <div id="AproposFirstPart">
            <p>
              48 rue Elias Howe, 94100 Saint-Maur-des-Fossés | Ouvert le Jeudi
              et le Vendredi de 17:00 à 20:00
            </p>
            <h1>L'HISTOIRE</h1>
            <h2>Trop nuls en guitare, bien meilleurs en bière</h2>
          </div>
          <section id="AproposSecondPart">
            {/* <div id="textRight"> */}
            {/* <h1>DECOUVREZ NOS RECETTES</h1> */}
            <p className="presentation">
              3ienchs est le fruit de deux passions qui nous animent, la bière
              et le rock. Le mariage qui était autrefois étincellant s'est peu à
              peu éteint, noyé dans la grande distribution musicale et
              brassicole. ​ Aujourd'hui il montre le bout de son nez et vous
              pouvez compter sur la Brasserie 3ienchs pour remettre à flots ces
              deux partenaires de longue date. <br /> Notre objectif : proposer
              des bières qui vous donnent envie de partager, de remuer et de
              faire des solos dignes de Jimmy Hendrix (sans pour autant brûler
              votre guitare).​
            </p>

            <figure>
              <img src={TomThib} alt="Tom et Thibault, fondateurs de 3ienchs" />
            </figure>

            <h2>LOREM IPSUM</h2>

            <p className="presentation_suite">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
              aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
              eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam
              est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
              velit, sed quia non numquam eius modi tempora incidunt ut labore
              et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima
              veniam, quis nostrum exercitationem ullam corporis suscipit
              laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem
              vel eum iure reprehenderit qui in ea voluptate velit esse quam
              nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo
              voluptas nulla pariatur?
            </p>

            <figure>
              <img src={Rockerbiere} alt="" />
            </figure>

            <h2>LOREM IPSUM</h2>

            <p className="presentation_suite">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
              aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
              eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam
              est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
              velit, sed quia non numquam eius modi tempora incidunt ut labore
              et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima
              veniam, quis nostrum exercitationem ullam corporis suscipit
              laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem
              vel eum iure reprehenderit qui in ea voluptate velit esse quam
              nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo
              voluptas nulla pariatur?
            </p>
            {/* <Button
                path="/bieres"
                // scriptColor="black"
                margin="30px auto 30px auto"
                text="NOS BIERES"
                class="button black"
              /> */}
            {/* </div> */}
          </section>
        </section>
        <Footer />
        <SocialMedias />
      </Fragment>
    );
  }
}

export default Apropos;
