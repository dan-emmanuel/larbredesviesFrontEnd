/*
  Actions/catalogue
  ------------------------------------------------------------
  This file contains the actions-type to be dispatched to the store.
  The actions are then handled by the reducers.
  ------------------------------------------------------------

*/
import { CustomerTypes } from "../..";
import { ActionType } from "../../action-types/customer";

interface filtercustomers {
  type: ActionType.FILTERCUSTOMERS;
  payload: string;
}
interface addcustomer {
  type: ActionType.ADDCUSTOMER;
  payload: CustomerTypes.Customer | string;
}
interface deletecustomer {
  type: ActionType.DELETECUSTOMER;
  payload: CustomerTypes.Customer["id"];
}
interface updatecustomer {
  type: ActionType.UPDATECUSTOMER;
  payload: Partial<CustomerTypes.Customer>;
}
interface getcustomers {
  type: ActionType.GETCUSTOMERS;
  payload: CustomerTypes.Customer[];
}
interface getcustomer {
  type: ActionType.GETCUSTOMER;
  payload: CustomerTypes.Customer["id"];
}
interface ordercustomers {
  type: ActionType.ORDERCUSTOMERS;
  payload: { key: keyof CustomerTypes.Customer; asc: "asc" | "desc" };
}
interface setnoerror {
  type: ActionType.SETNOERROR;
}

export type Action =
  | filtercustomers
  | addcustomer
  | deletecustomer
  | updatecustomer
  | getcustomers
  | getcustomer
  | ordercustomers
  | setnoerror;
