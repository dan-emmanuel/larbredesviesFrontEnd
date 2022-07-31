/*
  component : clientRow
  description : renders a row for a client
  props : 
  Components  :
    -Button
    -Row
    -Col


  States :
  Functions :
  hooks :


    
*/

//components
import React from "react";
// store

//style & assets
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button, Row } from "react-bootstrap";
import { Props } from "./interfaces";

const CustomerRow = (props: Props) => {
  // const dispatch = useDispatch();
  return (
    <>
      <tr key={props.customer.id}>
        <td>{props.customer.id}</td>
        <td>{props.customer.name}</td>
        <td>{props.customer.siret}</td>
        <td>{props.customer.tel}</td>
        <td>{props.customer.email}</td>
        <td>{props.customer.address}</td>
        <td>{props.customer.cp}</td>
        <td>{props.customer.solde_init}</td>
        <td>
          <Row className="justify-content-around">
            <Button variant="outline-warning" className="col-auto">
              <FontAwesomeIcon icon={faPen} />
            </Button>
            <Button variant="outline-danger" className="col-auto">
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </Row>
        </td>
      </tr>
    </>
  );
};

export default CustomerRow;
