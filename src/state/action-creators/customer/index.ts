/*
  action-creators/cusomers
  ------------------------------------------------------------
  This file contains the actions-creators for the customers.
  The actions-creators are used to dispatch actions to the store.
  The actions are then handled by the reducers.
  ------------------------------------------------------------

  The actions-creators are:
    @action filterCustomers
    @action addCustomer
    @action deleteCustomer
    @action updateCustomer
    @action getCustomers
    @action getCustomer
  )
*/

/* eslint-disable no-unreachable */
// import axios from "axios";
import { Dispatch } from "redux";
import { Action } from "../../actions/customer";
import { ActionType } from "../../action-types/customer";
import { CustomerTypes } from "../..";

export const filterCustomers = (text: string) => ({
  type: ActionType.FILTERCUSTOMERS,
  payload: text,
});
export const addcustomer = (
  e: Omit<CustomerTypes.Customer, "id" | "solde_init">
) => {
  try {
    return (dispatch: Dispatch<Action>) =>
      dispatch({
        type: ActionType.ADDCUSTOMER,
        payload: e,
      });
  } catch (e) {
    console.log(e);
  }
};
export const deletecustomer = (id: CustomerTypes.Customer["id"]) => {
  try {
    return (dispatch: Dispatch<Action>) =>
      dispatch({
        type: ActionType.DELETECUSTOMER,
        payload: id,
      });
  } catch (e) {
    console.log(e);
  }
};
export const updatecustomer = (
  e: Omit<CustomerTypes.Customer, "id" | "solde_init">
) => {
  try {
    return (dispatch: Dispatch<Action>) =>
      dispatch({
        type: ActionType.UPDATECUSTOMER,
        payload: e,
      });
  } catch (e) {
    console.log(e);
  }
};
export const getcustomers = () => {
  try {
    return (dispatch: Dispatch<Action>) =>
      dispatch({
        type: ActionType.GETCUSTOMERS,
        payload: [],
      });
  } catch (e) {
    console.log(e);
  }
};
export const getcustomer = (id: number) => {
  try {
    return (dispatch: Dispatch<Action>) =>
      dispatch({
        type: ActionType.GETCUSTOMER,
        payload: id,
      });
  } catch (e) {
    console.log(e);
  }
};
export const ordercustomers = (key: string, asc: boolean) => ({
  type: ActionType.ORDERCUSTOMERS,
  payload: { key: key, asc: asc },
});
