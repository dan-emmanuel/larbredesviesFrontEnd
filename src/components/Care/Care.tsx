import React from "react";
import { Container, Table } from "react-bootstrap";

const CareMain = () => {
  return (
    <>
      <>
        <h1>Clients</h1>
      </>
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nom</th>
              <th>Siret</th>
              <th>Téléphone</th>
              <th>Email</th>
              <th>Address</th>
              <th>Code postal</th>
              <th>Solde</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody></tbody>
        </Table>
      </Container>
    </>
  );
};
export default CareMain;
