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

export class ProductClass {
  constructor(
    public id: number,
    public productName: string,
    public category: string,
    public price: number,
    public reference: string,
    public commandNumber: number
  ) {}
}

export class CategoryClass {
  constructor(public id: number, public name: string) {}
}
