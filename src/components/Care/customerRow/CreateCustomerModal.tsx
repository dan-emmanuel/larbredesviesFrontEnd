/*
  component : CreateCustomerModal
  description : renders a modal to create a customer
  props : 

  Components  :
    -Modal
    -Button
    -Row
    -Table
    -CustomerRow

  States :
    -addcustomer
  Functions :
  
  hooks :
    -useDispatch : dispatch action to store
    -useState : to manage the modal state
    -useSelector : get customers from store


    
*/

//components
import React, { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import CustomerRow from "./CustomerRow";

//store
import { State, customerActionCreators, CustomerTypes } from "../../../state";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";

const CreateCustomerModal = ({
  setCurrentPage,
  setIsascending,
  setSortBy,
  nbCustomersPerPage,
  nbCustomer,
  handleScroll,
}: {
  setCurrentPage: (page: number) => void;
  setIsascending: (isAscending: boolean) => void;
  setSortBy: (sortBy: string) => void;
  nbCustomersPerPage: number;
  nbCustomer: number;
  handleScroll: () => void;
}) => {
  const [modalShow, setModalShow] = useState(false);
  const hasError = useSelector((state: State) => state.customer.hasError);

  const dispatch = useDispatch();
  const { addcustomer, setNoError } = bindActionCreators(
    customerActionCreators,
    dispatch
  );
  const [newCustomer, setnewCustomer] = useState<
    Partial<CustomerTypes.Customer>
  >(
    Object.assign(
      {},
      {
        name: "",
        siret: "",
        tel: "",
        email: "",
        password: "",
        address: "",
        cp: "",
        solde_init: 0,
      }
    )
  );
  useEffect(() => {
    if (hasError === false) {
      setModalShow(false);
    }
  }, [hasError]);
  return (
    <>
      <Button
        variant="outline-primary"
        onClick={() => {
          setnewCustomer(
            Object.assign(
              {},
              {
                name: "",
                siret: "",
                tel: "",
                email: "",
                password: "",
                address: "",
                cp: "",
                solde_init: 0,
              }
            )
          );
          setModalShow(true);
          setNoError();
        }}
      >
        Ajouter un client
      </Button>

      <Modal
        show={modalShow}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="bg-primary text-white">
          <Modal.Title id="contained-modal-title-vcenter ">
            Nouveau Client
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                {[
                  ["Nom", "name"],
                  ["Siret", "siret"],
                  ["Téléphone", "tel"],
                  ["Email", "email"],
                  ["Mot de passe", "password"],
                  ["Address", "address"],
                  ["Code postal", "cp"],
                  ["Solde", "solde_init"],
                ].map((key) => {
                  return <th key={key[1]}>{key[0]}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              <CustomerRow
                whithAction={false}
                customer={newCustomer}
                isEdit={true}
                noId={true}
                type="create"
                newCustomerState={[newCustomer, setnewCustomer]}
              />
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          {hasError && <div className="text-danger me-auto">{hasError}</div>}
          <Button
            variant="primary"
            onClick={() => {
              addcustomer(
                newCustomer as Omit<CustomerTypes.Customer, "id" | "solde_init">
              );
              setCurrentPage(Math.ceil(nbCustomer / nbCustomersPerPage));
              setIsascending(true);
              setSortBy("id");
              // handleScroll();
            }}
          >
            confirmer
          </Button>
          <Button
            variant="warning"
            onClick={(e) => {
              // setModalShow(false);
              setNoError();
            }}
          >
            Annuler
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateCustomerModal;
