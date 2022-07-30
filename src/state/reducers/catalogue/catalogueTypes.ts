/*
  reducer for catalogue types
  ------------------------------------------------------------
  This file contains the reducer's type for the catalogue.
  ------------------------------------------------------------
*/

export type Category = {
  id: number;
  name: string;
};

export type Product = {
  id: number;
  productName: string;
  category: string;
  price: number;
  reference: string;
  commandNumber: number;
};

export type CatalogueState = {
  products: Product[];
  categories: Category[];
  checkedCat: string;
};
