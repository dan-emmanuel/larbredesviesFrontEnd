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
  payload: number | "all";
}

interface CreateProductAction {
  type: ActionType.CREATEPRODUCT;
  payload: Omit<CatalogTypes.Product, "id" | "commandNumber"> | string;
}

interface DeleteProductAction {
  type: ActionType.DELETEPRODUCT;
  payload: CatalogTypes.Product["id"] | string;
}

interface UpdateProductAction {
  type: ActionType.UPDATEPRODUCT;
  payload: Omit<CatalogTypes.Product, "commandNumber">;
}
interface CreateCategory {
  type: ActionType.CREATECATEGORY;
  payload: string;
}
interface GetProducts {
  type: ActionType.GETPRODUCTS;
  payload: CatalogTypes.Product[];
}
interface GetCategories {
  type: ActionType.GETCATEGORIES;
  payload: CatalogTypes.Category[];
}
interface SetHasNoError {
  type: ActionType.SETHASNOERROR;
}
export type Action =
  | FilterProdAction
  | SetCheckedCatAction
  | CreateProductAction
  | DeleteProductAction
  | UpdateProductAction
  | CreateCategory
  | GetProducts
  | GetCategories
  | SetHasNoError;
