/*
  component : clientRow
  description : renders a row for a client
  props : 
  Components  :
    -Button
    -Row
    -Col


  States :
    -bindActionCreators
    -CustomerTypes
    -customerActionCreators
    -DeleteCustomerModal
    
  Functions :
  hooks :
    -useDispatch : dispatch action to store
    -useState : to manage the modal state



    
*/

//components
import React, { useState } from "react";
// store
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { CustomerTypes, customerActionCreators } from "../../../state";
import { Button, Row } from "react-bootstrap";
import DeleteCustomerModal from "./DeleteCustomerModal";
//style & assets
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faBan, faCheck } from "@fortawesome/free-solid-svg-icons";
import { Props } from "./interfaces";

const CustomerRow = ({
  customer,
  isEdit = false,
  type,
  whithAction = true,
  noId = false,
  newCustomerState = undefined,
}: Props) => {
  const [isEditing, setIsEditing] = useState(isEdit);
  const [newCustomer, setNewCustomer] = useState(Object.assign({}, customer));

  const dispatch = useDispatch();
  const { addcustomer, updatecustomer } = bindActionCreators(
    customerActionCreators,
    dispatch
  );
  const handleSubmit = () => {
    setIsEditing(false);
    if (type === "create") {
      addcustomer(
        newCustomer as Omit<CustomerTypes.Customer, "id" | "solde_init">
      );
    }
    if (type === "edit") {
      updatecustomer(newCustomer as CustomerTypes.Customer);
    }
  };
  return (
    <>
      <tr key={customer.id}>
        {!noId && <td width="5%">{customer.id}</td>}
        {Object.entries(customer)
          .filter(([key, value]) => key !== "id")
          .map(([key, value], index) => (
            <td key={index} width={key === "address" ? "15%" : "10%"}>
              {isEditing ? (
                <input
                  type={key === "solde_init" ? "number" : "text"}
                  className="w-100"
                  defaultValue={value}
                  name={key}
                  onChange={(e) =>
                    newCustomerState?.[1]({
                      ...newCustomerState[0],
                      [key]: e.target.value,
                    }) ??
                    setNewCustomer({ ...newCustomer, [key]: e.target.value })
                  }
                />
              ) : (
                value
              )}
            </td>
          ))}
        {whithAction && (
          <td width="10%">
            <Row className="justify-content-around">
              <Button
                variant="outline-warning"
                className={`col-auto ${isEditing ? "d-none" : ""}`}
                onClick={() => setIsEditing(!isEditing)}
              >
                <FontAwesomeIcon icon={faPen} />
              </Button>
              <Button
                variant="outline-success"
                className={`col-auto ${isEditing ? "" : "d-none"}`}
                onClick={handleSubmit}
              >
                <FontAwesomeIcon icon={faCheck} />
              </Button>

              <Button
                variant="outline-danger"
                className={`col-auto ${isEditing ? "" : "d-none"}`}
                onClick={() => setIsEditing(!isEditing)}
              >
                <FontAwesomeIcon icon={faBan} />
              </Button>
              <DeleteCustomerModal
                customer={customer as CustomerTypes.Customer}
                isEditing={isEditing}
              />
            </Row>
          </td>
        )}
      </tr>
    </>
  );
};

export default CustomerRow;
