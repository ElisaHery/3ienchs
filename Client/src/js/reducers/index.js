// src/js/reducers/index.js

const initialState = {
  articlesPanier: [],
  connectedUser: false,
  userPrenom: "",
  userNom: "",
  userID: "",
  userMail: ""
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PANIER":
      // console.log("bière panier ==>", action.payload);
      //vérifie si cette bière est déjà dans le panier ou non.
      let biereAlreadyinPanierIndex = state.articlesPanier
        .map(function(e) {
          return e.typeBiere;
        })
        .indexOf(action.payload.typeBiere);

      // fais une copie du panier existant
      let articlesPanier = state.articlesPanier.slice();

      //si on a placé "true" en 2ème argument, on va remplacer la quantité dans le panier (page "panier")
      if (action.replaceInPanier) {
        articlesPanier[biereAlreadyinPanierIndex].quantity = +action.payload
          .quantity;
      } else {
        //sinon on va ajouter à la quantité déjà existante (page "nos bières")
        if (biereAlreadyinPanierIndex > -1) {
          articlesPanier[biereAlreadyinPanierIndex].quantity =
            +articlesPanier[biereAlreadyinPanierIndex].quantity +
            +action.payload.quantity;
        } else {
          articlesPanier.push(action.payload);
        }
      }

      return {
        ...state,
        // articlesPanier: [...state.articlesPanier, action.payload]
        articlesPanier
      };
    // return { ...state, articles: [...state.articles, action.payload] }; --> on ajoute la valeur aux valeurs déjà existantes

    case "ADD_PRICE_PANIER":
      console.log("prixtotal ==>", action.payload);
      let biereIndex = state.articlesPanier
        .map(function(e) {
          return e.typeBiere;
        })
        .indexOf(action.payload.biere);

      let articlesInPanier = state.articlesPanier.slice();

      articlesInPanier[biereIndex].totalPrice = +action.payload.totalPrice;
      console.log(articlesInPanier);

      return { ...state, articlesInPanier };

    case "DELETE_FROM_PANIER":
      //renvoie l'index de la bière à supprimer
      let biereToDeleteIndex = state.articlesPanier
        .map(function(e) {
          return e.typeBiere;
        })
        .indexOf(action.payload);

      console.log("index de la bière à supp ==>", biereToDeleteIndex);

      let panier = state.articlesPanier.slice();
      panier.splice(biereToDeleteIndex, 1);
      console.log("nouveau state ==>", panier);

      return {
        ...state,
        articlesPanier: panier
      };

    case "CONNECTED_USER":
      console.log("state avant clic ==>", state.connectedUser);
      console.log("reçu du login ==>", action.payload);
      return {
        ...state,
        // userPrenom: action.payload[0].user_prenom,
        // userNom: action.payload[0].user_nom,
        // userID: action.payload[0].user_id,
        // userMail: action.payload[0].user_mail,
        // connectedUser: action.payload[1]
        connectedUser: action.payload
      };

    case "LOGOUT_USER":
      return {
        ...state,
        userPrenom: "",
        userNom: "",
        userID: "",
        connectedUser: false,
        userMail: ""
      };
    //   // ...state,
    //   // filtered_themes: [...state.filtered_themes, action.payload]
    // };

    //   case "FILTER_COLORS":
    //     //return { ...state, filter_price: [action.payload] };
    //     //console.log(action.payload);
    //     return { ...state, filtered_colors: action.payload };

    default:
      return state;
  }
};
export default rootReducer;
