/*
  reducer for catalogue types
  ------------------------------------------------------------
  This file contains the reducer's type for the catalogue.
  ------------------------------------------------------------
*/

export type Customer = {
  id: number;
  name: string;
  siret: string;
  tel: string;
  email: string;
  password: string;
  address: string;
  cp: string;
  solde_init: number;
};

export type CustomerState = {
  customers: Customer[];
  selectedCustomerId: number | null;
};
