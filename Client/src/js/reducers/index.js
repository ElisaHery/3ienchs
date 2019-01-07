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
      //vérifie q'il existe déjà de cette bière dans le panier. Si oui, on ajoute les quantités, sinon on push un nouvel
      //objet dans le tableau.

      let biereAlreadyinPanierIndex = state.articlesPanier
        .map(function(e) {
          return e.typeBiere;
        })
        .indexOf(action.payload.typeBiere);

      // make a copy of the existing array
      let articlesPanier = state.articlesPanier.slice();

      if (biereAlreadyinPanierIndex > -1) {
        articlesPanier[biereAlreadyinPanierIndex].quantity =
          +articlesPanier[biereAlreadyinPanierIndex].quantity +
          +action.payload.quantity;
      } else {
        articlesPanier.push(action.payload);
      }

      return {
        ...state,
        // articlesPanier: [...state.articlesPanier, action.payload]
        articlesPanier
      };
    // return { ...state, articles: [...state.articles, action.payload] }; --> on ajoute la valeur aux valeurs déjà existantes

    case "CONNECTED_USER":
      //return { ...state, filter_price: [action.payload] };
      console.log("reçu du login ==>", action.payload);
      // return {
      return {
        ...state,
        userPrenom: action.payload.user_prenom,
        userNom: action.payload.user_nom,
        userID: action.payload.user_id,
        userMail: action.payload.user_mail,
        connectedUser: true
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
