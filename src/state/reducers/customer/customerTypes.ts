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
  crdate_creation?: string;
  last_update?: string;
};
export class CustomerSclass {
  constructor(
    public id: number,
    public name: string,
    public siret: string,
    public tel: string,
    public email: string,
    public password: string,
    public address: string,
    public cp: string,
    public solde_init: number,
    public crdate_creation?: string,
    public last_update?: string
  ) {}
}

export type CustomerState = {
  customers: Customer[] | [];
  selectedCustomerId: number | null;
  hasError: boolean | string;
  total: number;
};
