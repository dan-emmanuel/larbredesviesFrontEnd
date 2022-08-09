/*
  This file contains the reducer's for the catalogue.
  ------------------------------------------------------------
  This file contains the reducer's for the catalogue.
  ------------------------------------------------------------
*/

import { ActionType } from "../../action-types/catalogue";
import { CatalogueState } from "./catalogueTypes";
import { Action } from "../../actions/catalogue";

const initState: CatalogueState = {
  products: [],
  categories: [],
  checkedCat: "toutes",
};

export const catalogueReducer = (
  state = initState,
  action: Action
): CatalogueState => {
  switch (action.type) {
    case ActionType.FILTERPROD:
      return {
        ...state,
        products: initState.products.filter(
          (product) =>
            product.productName.includes(action.payload) ||
            product.reference.includes(action.payload)
        ),
      };
    case ActionType.SETCHECKEDCAT:
      return {
        ...state,
        checkedCat: action.payload,
        products:
          action.payload === "toutes"
            ? initState.products
            : initState.products.filter(
                (prod) => prod.category === action.payload
              ),
      };
    case ActionType.CREATEPRODUCT:
      return {
        ...state,
        products: [
          ...state.products,
          {
            ...action.payload,
            id: state.products.length + 1,
            commandNumber: 0,
          },
        ],
        categories: state.categories.some(
          (cat) => cat.name === action.payload.category
        )
          ? state.categories
          : [
              ...state.categories,
              { id: state.categories.length, name: action.payload.category },
            ],
        checkedCat: "toutes",
      };
    case ActionType.DELETEPRODUCT:
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload
        ),
      };
    case ActionType.UPDATEPRODUCT:
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id
            ? { ...action.payload, commandNumber: product.commandNumber }
            : product
        ),
        categories: state.categories.some(
          (cat) => cat.name === action.payload.category
        )
          ? state.categories
          : [
              ...state.categories,
              { id: state.categories.length, name: action.payload.category },
            ],
        checkedCat: "toutes",
      };
    case ActionType.CREATECATEGORY:
      return {
        ...state,
        categories: [
          ...state.categories,
          { name: action.payload, id: state.categories.length + 1 },
        ],
        checkedCat: action.payload,
      };

    default:
      return { ...state };
  }
};

export default catalogueReducer;
