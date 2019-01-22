// src/js/actions/index.js
// import { ADD_ARTICLE } from "../constants/action-types";

export const AddPanier = (articlesToAdd, boolean) => ({
  type: "ADD_PANIER",
  payload: articlesToAdd,
  //lorsque l'on veut remplacer la quantité dans le panier, et non ajouter
  replaceInPanier: boolean
});

export const AddPricePanier = CalculatedPrice => ({
  type: "ADD_PRICE_PANIER",
  payload: CalculatedPrice
});

export const DeleteFromPanier = articlesToDelete => ({
  type: "DELETE_FROM_PANIER",
  payload: articlesToDelete
});

export const ConnectedUser = connectedUser => ({
  type: "CONNECTED_USER",
  payload: connectedUser
});

export const LogoutUser = el => ({
  type: "CONNECTED_USER",
  payload: el
});
