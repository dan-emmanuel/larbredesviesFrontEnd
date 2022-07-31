/*
  component : Customer
  description : Render customer table
  props :

  Components  :
    - CustomerRow
    - Table

  States :
    - customers : array of customers
  Functions :
    - getCustomers : get customers from store
  hooks :
    - useSelector : get customers from store
    - useDispatch : dispatch action to store



    
*/

//components
import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Row,
  Table,
  Form,
  Dropdown,
} from "react-bootstrap";
import ClientRow from "./customerRow/CustomerRow";
import PageSelector from "./PageSelector";
// store
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

import { State, CustomerTypes, customerActionCreators } from "../../state";
//components

//style & assets
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

const CareMain = () => {
  const numberPerPageArrSelector = [10, 20, 50, 100];
  const customers = useSelector((state: State) => state.customer.customers);
  const [nbCustomersPerPage, setnbCustomersPerPage] = useState(
    numberPerPageArrSelector[0]
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [isascending, setIsascending] = useState(true);
  const [sortBy, setSortBy] = useState("id");
  const customerToShow = customers.slice(
    nbCustomersPerPage * currentPage - nbCustomersPerPage,
    nbCustomersPerPage * currentPage
  );
  const dispatch = useDispatch();

  const { filterCustomers, ordercustomers } = bindActionCreators(
    customerActionCreators,
    dispatch
  );

  return (
    <>
      <Container>
        <Row className="justify-content-between">
          <Col as="h1" xs="auto">
            Clients
          </Col>

          <Col xs="auto">
            <Button variant="outline-primary">Ajouter un client</Button>
          </Col>
        </Row>
        <Row className="justify-content-between">
          <Dropdown className="col-2">
            <Dropdown.Toggle variant="primary">
              {nbCustomersPerPage}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {numberPerPageArrSelector.map((nb) => (
                <Dropdown.Item
                  key={nb}
                  onClick={() => {
                    setnbCustomersPerPage(nb);
                    setCurrentPage(1);
                  }}
                >
                  {nb}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Col xs={5}>
            <Form.Control
              type="text"
              placeholder="Search"
              onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
                filterCustomers(event?.target?.value);
              }}
            />
            <span className="text-black-50">
              {`${customers.length} résultats trouvés`}
            </span>
          </Col>
          <PageSelector
            nbCustomersPerPage={nbCustomersPerPage}
            currentPage={currentPage}
            nbCustomer={customers.length}
            setCurrentPage={setCurrentPage}
          />
        </Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              {[
                ["Id", "id"],
                ["Nom", "name"],
                ["Siret", "siret"],
                ["Téléphone", "tel"],
                ["Email", "email"],
                ["Address", "address"],
                ["Code postal", "cp"],
                ["Solde", "solde_init"],
              ].map((key) => {
                return (
                  <th
                    key={key[1]}
                    onClick={() => {
                      setIsascending(sortBy === key[1] ? !isascending : true);
                      setSortBy(key[1]);
                      ordercustomers(key[1], isascending);
                      setCurrentPage(1);
                    }}
                  >
                    <Row className="justify-content-center">
                      <Col className="px-1" xs="auto">
                        {key[0]}
                      </Col>
                      <div className="d-flex flex-column col-auto px-1">
                        <FontAwesomeIcon
                          color={
                            sortBy !== key[1] || isascending === false
                              ? "#6c757d"
                              : "black"
                          }
                          icon={faCaretUp}
                        />

                        <FontAwesomeIcon
                          color={
                            sortBy !== key[1] || isascending === true
                              ? "#6c757d"
                              : "black"
                          }
                          icon={faCaretDown}
                        />
                      </div>
                    </Row>
                  </th>
                );
              })}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customerToShow.map((customer: CustomerTypes.Customer) => (
              <ClientRow key={customer.id} customer={customer} />
            ))}
          </tbody>
        </Table>
        <Row className="justify-content-between">
          <Col xs="auto">
            <Dropdown>
              <Dropdown.Toggle variant="primary">
                {nbCustomersPerPage}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  variant="outline-secondary"
                  onClick={() => setnbCustomersPerPage(10)}
                  as={Button}
                >
                  10
                </Dropdown.Item>
                <Dropdown.Item
                  variant="outline-secondary"
                  onClick={() => setnbCustomersPerPage(50)}
                  as={Button}
                >
                  50
                </Dropdown.Item>
                <Dropdown.Item
                  variant="outline-secondary"
                  onClick={() => setnbCustomersPerPage(100)}
                  as={Button}
                >
                  100
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <PageSelector
            nbCustomersPerPage={nbCustomersPerPage}
            currentPage={currentPage}
            nbCustomer={customers.length}
            setCurrentPage={setCurrentPage}
          />
        </Row>
      </Container>
    </>
  );
};
export default CareMain;
