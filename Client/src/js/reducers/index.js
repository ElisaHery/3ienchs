// src/js/reducers/index.js

const initialState = {
  articlesPanier: [
    {
      typeBiere: "Big Daddy 33cl",
      quantity: 3,
      id: 1,
      unitePrice: 3,
      packable: 1,
      totalPrice: 9
    },
    {
      typeBiere: "Wawah 33cl",
      quantity: 3,
      id: 2,
      unitePrice: 3,
      packable: 1,
      totalPrice: 9
    }
  ],
  connectedUser: false,
  userPrenom: "",
  userNom: "",
  userID: "",
  userMail: ""
};

//CALCUL PRIX DES BIERES A LEUR ENTREE DANS LE STORE
let priceWithoutModulo = (clientQty, packQty, packPrice) => {
  const prix = (clientQty / packQty) * packPrice;
  return +prix.toFixed(2);
};
let priceWithModulo = (clientQty, packQty, packPrice, unitePrice) => {
  const remainder = clientQty % packQty;
  const prix =
    ((clientQty - remainder) / packQty) * packPrice + remainder * unitePrice;
  return +prix.toFixed(2);
};
const calculatePrice = (clientQty, unitePrice, packable) => {
  const pack6Price = +15;
  const pack24Price = +55.2;
  // si moins de 6 bières, elles sont calculées à l'unité
  if (clientQty < 6) {
    const prix = +(clientQty * unitePrice).toFixed(2);
    return prix;
  } else {
    // si plus de 6 bières, on détermine si elles sont packables ou non
    if (packable === 1) {
      //si on a entre 6 et 24 bières, on détermine si c'est un multiple de 6 ou non et on applique la fonction correspondante
      if (clientQty < 24) {
        if (clientQty % 6 === 0) {
          const prix = priceWithoutModulo(clientQty, 6, pack6Price);
          return prix;
        } else {
          const prix = priceWithModulo(clientQty, 6, pack6Price, unitePrice);
          return prix;
        }
        // si on a plus de 24bières on fait la même chose avec les multiples de 24
      } else {
        //si multiple de 24
        const remainderFrom24 = clientQty % 24;
        const clientQtyLessremainder = clientQty - remainderFrom24;
        if (remainderFrom24 === 0) {
          const prix = priceWithoutModulo(clientQty, 24, pack24Price);
          return prix;
          // si pas multiple de 24 et que le reste est supérieur à 6 (= on doit appliquer les promo sur le reste)
        } else if (remainderFrom24 > 5) {
          if (remainderFrom24 % 6 === 0) {
            const prix =
              priceWithoutModulo(clientQtyLessremainder, 24, pack24Price) +
              priceWithoutModulo(remainderFrom24, 6, pack6Price);

            return prix;
          } else {
            const prix =
              priceWithoutModulo(clientQtyLessremainder, 24, pack24Price) +
              priceWithModulo(remainderFrom24, 6, pack6Price, unitePrice);

            return prix;
          }
          //si pas multiple de 24 et que le reste est inférieur à 6
        } else {
          const prix = priceWithModulo(clientQty, 24, pack24Price, unitePrice);
          return prix;
        }
      }
      // si elles ne sont pas packables c'est facile car les promos ne s'appliquent pas ==> on revient à un calcul à l'unité
    } else {
      const prix = +(clientQty * unitePrice).toFixed(2);
      return prix;
    }
  }
};

//ACTIONS DU STORE
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PANIER":
      // console.log("bière  ==>", action.payload);
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
        articlesPanier[biereAlreadyinPanierIndex].totalPrice = calculatePrice(
          action.payload.quantity,
          articlesPanier[biereAlreadyinPanierIndex].unitePrice,
          articlesPanier[biereAlreadyinPanierIndex].packable
        );
      } else {
        //sinon on va ajouter à la quantité déjà existante (page "nos bières")
        if (biereAlreadyinPanierIndex > -1) {
          articlesPanier[biereAlreadyinPanierIndex].quantity =
            +articlesPanier[biereAlreadyinPanierIndex].quantity +
            +action.payload.quantity;
          articlesPanier[biereAlreadyinPanierIndex].totalPrice = calculatePrice(
            action.payload.quantity,
            action.payload.unitePrice,
            action.payload.packable
          );
        } else {
          action.payload.totalPrice = calculatePrice(
            action.payload.quantity,
            action.payload.unitePrice,
            action.payload.packable
          );
          articlesPanier.push(action.payload);
        }
      }

      // console.log(articlesPanier);
      return {
        ...state,
        // articlesPanier: [...state.articlesPanier, action.payload]
        articlesPanier
      };

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
      // console.log("state avant clic ==>", state.connectedUser);
      // console.log("reçu du login ==>", action.payload);
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

    default:
      return state;
  }
};
export default rootReducer;
