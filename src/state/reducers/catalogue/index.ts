/*
  This file contains the reducer's for the catalogue.
  ------------------------------------------------------------
  This file contains the reducer's for the catalogue.
  ------------------------------------------------------------
*/

import { ActionType } from "../../action-types/catalogue";
import { CatalogueState, CategoryClass, Product } from "./catalogueTypes";
import { Action } from "../../actions/catalogue";

const initState: CatalogueState = {
  products: [],
  categories: [],
  checkedCat: "all",
  hasError: false,
};

export const catalogueReducer = (
  state = initState,
  action: Action
): CatalogueState => {
  switch (action.type) {
    case ActionType.FILTERPROD:
      return {
        ...state,
        products: initState.products.filter((product) => {
          return (
            product.name.includes(action.payload) ||
            `${product.reference}`.includes(action.payload)
          );
        }),
      };
    case ActionType.SETCHECKEDCAT:
      return {
        ...state,
        checkedCat: action.payload,
        products:
          action.payload === "all"
            ? initState.products
            : initState.products.filter(
                (prod) => prod.category === action.payload
              ),
      };
    case ActionType.CREATEPRODUCT:
      console.log(action.payload);

      if (typeof action.payload === "string") {
        console.log("error");

        return { ...state, hasError: action.payload };
      }

      const stateUpdateurAdd = (state: CatalogueState) =>
        ({
          ...state,
          products: [
            ...state.products,
            {
              ...(action.payload as Omit<Product, "id">),
              id: state.products.length + 1,
              commandNumber: 0,
            },
          ],
          categories: state.categories.some(
            (cat) => cat.id === (action.payload as Omit<Product, "id">).category
          )
            ? state.categories
            : [
                ...state.categories,
                new CategoryClass(
                  1,
                  "new category",
                  (action.payload as Omit<Product, "id">).category
                ),
              ],
          checkedCat: "all",
        } as CatalogueState);
      stateUpdateurAdd(initState);
      return stateUpdateurAdd(state);
    case ActionType.DELETEPRODUCT:
      const stateUpdateurRemove = (state: CatalogueState) => ({
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload
        ),
      });
      stateUpdateurRemove(initState);
      return stateUpdateurRemove(state);
    case ActionType.UPDATEPRODUCT:
      const stateUpdateurUpdate = (state: CatalogueState) => ({
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id
            ? { ...action.payload, commandNumber: product.commandNumber }
            : product
        ),
        categories: state.categories.some(
          (cat) => cat.id === action.payload.category
        )
          ? state.categories
          : [
              ...state.categories,
              new CategoryClass(0, "new category", state.categories.length + 1),
            ],
      });

      stateUpdateurUpdate(initState);
      return {
        ...stateUpdateurUpdate(state),
        checkedCat: "all",
      };
    case ActionType.CREATECATEGORY:
      initState.categories.push({ count: 0, name: action.payload, id: NaN });
      return {
        ...state,
        categories: [
          ...state.categories,
          new CategoryClass(0, action.payload, state.categories.length + 1),
        ],
        checkedCat: state.categories.length + 1,
      };
    case ActionType.GETPRODUCTS:
      initState.products = action.payload;
      return {
        ...state,
        products: action.payload,
      };
    case ActionType.GETCATEGORIES:
      initState.categories = action.payload;
      return {
        ...state,
        categories: action.payload,
      };
    case ActionType.SETHASNOERROR:
      return {
        ...state,
        hasError: false,
      };
    default:
      return { ...state };
  }
};

export default catalogueReducer;
