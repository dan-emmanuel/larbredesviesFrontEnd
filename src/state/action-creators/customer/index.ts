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
import axios from "axios";

export const filterCustomers = (text: string) => ({
  type: ActionType.FILTERCUSTOMERS,
  payload: text,
});
export const addcustomer = (
  e: Omit<CustomerTypes.Customer, "id" | "solde_init">
) => {
  try {
    return async (dispatch: Dispatch<Action>) => {
      const newClient = await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}customer`,
        data: e,
      });
      console.log(`________newClient________`, newClient?.data?.records?.error);
      return newClient?.data?.records?.error
        ? dispatch({
            type: ActionType.ADDCUSTOMER,
            payload: newClient?.data?.records?.error,
          })
        : dispatch({
            type: ActionType.ADDCUSTOMER,
            payload: newClient.data.records,
          });
    };
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
    return async (dispatch: Dispatch<Action>) => {
      const clis = await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}customer/all`,
      });
      console.log(clis);

      dispatch({
        type: ActionType.GETCUSTOMERS,
        payload: clis.data.records,
      });
    };
  } catch (e) {
    console.log(e);
  }
};
export const getcustomer = (id: number) => {
  try {
    return async (dispatch: Dispatch<Action>) =>
      dispatch({
        type: ActionType.GETCUSTOMER,
        payload: id,
      });
  } catch (e) {
    console.log(e);
  }
};
export const setNoError = () => {
  try {
    return (dispatch: Dispatch<Action>) =>
      dispatch({
        type: ActionType.SETNOERROR,
      });
  } catch (e) {
    console.log(e);
  }
};
export const ordercustomers = (key: string, asc: boolean) => ({
  type: ActionType.ORDERCUSTOMERS,
  payload: { key: key, asc: asc },
});
