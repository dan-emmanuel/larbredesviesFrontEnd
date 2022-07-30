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
  products: [
    {
      id: 1,
      productName: "agrafes",
      category: "bureautique",
      price: 50,
      reference: "agr32",
      commandNumber: 16,
    },
    {
      id: 2,
      productName: "trombones",
      category: "papetterie",
      price: 10,
      reference: "agr32",
      commandNumber: 16,
    },
    {
      id: 3,
      productName: "stylos",
      category: "mobillier",
      price: 10,
      reference: "agr32",
      commandNumber: 16,
    },
    {
      id: 4,
      productName: "agrafes",
      category: "infomatique",
      price: 50,
      reference: "agr32",
      commandNumber: 16,
    },
    {
      id: 5,
      productName: "trombones",
      category: "bureautique",
      price: 10,
      reference: "agr32",
      commandNumber: 16,
    },
    {
      id: 6,
      productName: "stylos",
      category: "papetterie",
      price: 10,
      reference: "agr32",
      commandNumber: 16,
    },
    {
      id: 7,
      productName: "agrafes",
      category: "mobillier",
      price: 50,
      reference: "agr32",
      commandNumber: 16,
    },
    {
      id: 8,
      productName: "trombones",
      category: "infomatique",
      price: 10,
      reference: "agr32",
      commandNumber: 16,
    },
    {
      id: 9,
      productName: "stylos",
      category: "bureautique",
      price: 10,
      reference: "agr32",
      commandNumber: 16,
    },
    {
      id: 10,
      productName: "agrafes",
      category: "papetterie",
      price: 50,
      reference: "agr32",
      commandNumber: 16,
    },
    {
      id: 11,
      productName: "trombones",
      category: "mobillier",
      price: 10,
      reference: "agr32",
      commandNumber: 16,
    },
    {
      id: 12,
      productName: "stylos",
      category: "infomatique",
      price: 10,
      reference: "agr32",
      commandNumber: 16,
    },
    {
      id: 13,
      productName: "agrafes",
      category: "bureautique",
      price: 50,
      reference: "agr32",
      commandNumber: 16,
    },
    {
      id: 14,
      productName: "trombones",
      category: "papetterie",
      price: 10,
      reference: "agr32",
      commandNumber: 16,
    },
    {
      id: 15,
      productName: "stylos",
      category: "mobillier",
      price: 10,
      reference: "agr32",
      commandNumber: 16,
    },
    {
      id: 16,
      productName: "stylos",
      category: "infomatique",
      price: 10,
      reference: "agr32",
      commandNumber: 16,
    },
  ],
  categories: [
    { id: 0, name: "bureautique" },
    { id: 1, name: "papetterie" },
    { id: 2, name: "mobillier" },
    { id: 3, name: "infomatique" },
  ],
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
