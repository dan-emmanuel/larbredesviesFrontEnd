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
import React, { useEffect, useState } from "react";
// store
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { CustomerTypes, customerActionCreators } from "../../../state";
import { Button, Row, Placeholder } from "react-bootstrap";
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
  placeholder = false,
  tdOrder = [
    "id",
    "name",
    "siret",
    "tel",
    "email",
    "password",
    "address",
    "cp",
    "solde_init",
  ],
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

  useEffect(() => {
    setNewCustomer(Object.assign({}, customer));
  }, [customer]);
  return (
    <>
      <tr key={customer.id}>
        {!noId &&
          (!placeholder ? (
            <td width="5%">{customer.id}</td>
          ) : (
            <Placeholder as="td" animation="glow">
              <Placeholder as="p" xs={12} className="h-100 m-0" />
            </Placeholder>
          ))}
        {!placeholder
          ? tdOrder.map((key: string, index) => {
              const value: any = customer[key as keyof typeof customer];
              return (
                <td key={index} width="10%">
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
                        setNewCustomer({
                          ...newCustomer,
                          [key]: e.target.value,
                        })
                      }
                    />
                  ) : (
                    value
                  )}
                </td>
              );
            })
          : tdOrder.map((key: string, index) => {
              return (
                <Placeholder key={index} as="td" animation="glow">
                  <Placeholder as="p" xs={12} className="h-100 m-0" />
                </Placeholder>
              );
            })}
        {whithAction && !placeholder && (
          <td width="10%">
            <Row className="justify-content-around">
              <Button
                variant="outline-warning"
                className={`col-auto ${isEditing ? "d-none" : ""}`}
                onClick={() => {
                  console.log(newCustomer);

                  setIsEditing(!isEditing);
                }}
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
