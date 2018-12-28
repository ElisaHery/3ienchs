// src/js/actions/index.js
// import { ADD_ARTICLE } from "../constants/action-types";

export const AddPanier = articlesToAdd => ({
  type: "ADD_PANIER",
  payload: articlesToAdd
});

export const ConnectedUser = connectedUser => ({
  type: "CONNECTED_USER",
  payload: connectedUser
});
