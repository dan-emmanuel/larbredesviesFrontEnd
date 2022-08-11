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
import axios from "axios";
//Read Actions
export const getProducts = () => async (dispatch: Dispatch) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}catalog/all`
    );

    dispatch({
      type: ActionType.GETPRODUCTS,
      payload: response.data.records.data,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getCategories = () => async (dispatch: Dispatch) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}catalog/categories`
    );
    dispatch({
      type: ActionType.GETCATEGORIES,
      payload: response.data.records,
    });
  } catch (error) {
    console.log(error);
  }
};

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

export const setCheckedCategory = (e: number | "all") => {
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
      console.log(e);

      const newProduct = await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}catalog/product`,
        data: e,
      });
      return newProduct?.data?.error
        ? dispatch({
            type: ActionType.CREATEPRODUCT,
            payload: newProduct?.data?.error,
          })
        : dispatch({
            type: ActionType.CREATEPRODUCT,
            payload: newProduct.data.records,
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

export const setHasNoError = () => {
  try {
    return (dispatch: Dispatch<Action>) =>
      dispatch({
        type: ActionType.SETHASNOERROR,
      });
  } catch (error) {
    console.log(error);
  }
};
