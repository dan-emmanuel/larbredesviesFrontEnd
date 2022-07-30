import { createCategory } from "./../../action-creators/catalogue/index";
/*
  Actions/catalogue
  ------------------------------------------------------------
  This file contains the actions-type to be dispatched to the store.
  The actions are then handled by the reducers.
  ------------------------------------------------------------

*/
import { CatalogTypes } from "../..";
import { ActionType } from "../../action-types/catalogue";

interface FilterProdAction {
  type: ActionType.FILTERPROD;
  payload: string;
}

interface SetCheckedCatAction {
  type: ActionType.SETCHECKEDCAT;
  payload: string;
}

interface CreateProductAction {
  type: ActionType.CREATEPRODUCT;
  payload: Omit<CatalogTypes.Product, "id" | "commandNumber">;
}

interface DeleteProductAction {
  type: ActionType.DELETEPRODUCT;
  payload: CatalogTypes.Product["id"];
}

interface UpdateProductAction {
  type: ActionType.UPDATEPRODUCT;
  payload: Omit<CatalogTypes.Product, "commandNumber">;
}
interface CreateCategory {
  type: ActionType.CREATECATEGORY;
  payload: string;
}

export type Action =
  | FilterProdAction
  | SetCheckedCatAction
  | CreateProductAction
  | DeleteProductAction
  | UpdateProductAction
  | CreateCategory;
