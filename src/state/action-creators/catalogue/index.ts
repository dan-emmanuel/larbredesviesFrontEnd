/*
  action-creators/catalogue
  ------------------------------------------------------------
  This file contains the actions-creators for the catalogue.
  The actions-creators are used to dispatch actions to the store.
  The actions are then handled by the reducers.
  ------------------------------------------------------------

  The actions-creators are:
    @action filterCatalogue
    @action setCheckedCategory
    @createProduct
    @deleteProduct
    @updateProduct
    @createCategory

  )
*/

/* eslint-disable no-unreachable */
// import axios from "axios";
import { Dispatch } from "redux";
import { Action } from "../../actions/catalogue";
import { ActionType } from "../../action-types/catalogue";
import { CatalogTypes } from "../..";
//Read Actions
export const filterProducts = (e: string) => {
  try {
    return (dispatch: Dispatch<Action>) =>
      dispatch({
        type: ActionType.FILTERPROD,
        payload: e,
      });
  } catch (error) {
    console.log(error);
  }
};

export const setCheckedCategory = (e: string) => {
  try {
    return (dispatch: Dispatch<Action>) =>
      dispatch({
        type: ActionType.SETCHECKEDCAT,
        payload: e,
      });
  } catch (error) {
    console.log(error);
  }
};

export const createProduct = (
  e: Omit<CatalogTypes.Product, "id" | "commandNumber">
) => {
  try {
    return async (dispatch: Dispatch<Action>) => {
      return dispatch({
        type: ActionType.CREATEPRODUCT,
        payload: e,
      });
    };
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = (e: CatalogTypes.Product["id"]) => {
  try {
    return (dispatch: Dispatch<Action>) =>
      dispatch({
        type: ActionType.DELETEPRODUCT,
        payload: e,
      });
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = (
  e: Omit<CatalogTypes.Product, "commandNumber">
) => {
  try {
    return (dispatch: Dispatch<Action>) =>
      dispatch({
        type: ActionType.UPDATEPRODUCT,
        payload: e,
      });
  } catch (error) {
    console.log(error);
  }
};
export const createCategory = (e: string) => {
  try {
    return (dispatch: Dispatch<Action>) =>
      dispatch({
        type: ActionType.CREATECATEGORY,
        payload: e,
      });
  } catch (error) {
    console.log(error);
  }
};
