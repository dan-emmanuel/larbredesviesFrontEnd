/*
  component : productModal
  description : productModal component that displays a modal with a form to create | update | delete a product
  props :
    - btnVariant : string
    - btncontent : string
    - btnLogo : string
    - btnClasName : string
    - prodId : string
  Components  :
    - ProductForm
  States :
    - products : Product[]

  Functions :

  hooks :
    - useSelector
    - useDispatch
    - bindActionCreators

    
*/

import React, { useState } from "react";

// store
import { useSelector } from "react-redux";
import { State, CatalogTypes } from "../../state";
//components
import "./prodRow.scss";
import { Button, Modal } from "react-bootstrap";
import ProductForm from "./productForm/ProductForm";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface FormCreateProdPropsWithId {
  btnVariant: string;
  btncontent: any;
  btnLogo: IconDefinition;
  btnClasName?: string;
  prodId: number;
  type: "update" | "delete";
}

interface FormUpdateProdPropswithoutId {
  btnVariant: string;
  btncontent: any;
  btnLogo: IconDefinition;
  btnClasName?: string;
  prodId?: number;
  type: "create";
}

type productModalProps =
  | FormCreateProdPropsWithId
  | FormUpdateProdPropswithoutId;

const ProductModal = (props: productModalProps) => {
  const [show, setShow] = useState(false);

  // const dispatch = useDispatch();
  // const {} = bindActionCreators(catalogueActionCreators, dispatch);

  const { products } = useSelector((state: State) => state.catalogue);
  const [product, setProduit] = useState(
    products.find(
      (product: CatalogTypes.Product) => product.id === props.prodId
    )
  );

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setProduit(
      products.find(
        (product: CatalogTypes.Product) => product.id === props.prodId
      )
    );
    setShow(true);
  };

  return (
    <>
      <Button
        className={props.btnClasName}
        variant={props.btnVariant}
        onClick={handleShow}
      >
        {props.btnLogo ? (
          <>
            {props.btncontent} <FontAwesomeIcon icon={props.btnLogo} />
          </>
        ) : (
          props.btncontent
        )}
      </Button>

      <Modal centered size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {`Produit
            ${
              product
                ? `Modification du produit ${product.productName}`
                : "Création"
            }`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProductForm
            {...(props.type === "create"
              ? { type: props.type }
              : { type: props.type, id: props.prodId })}
            modalCloser={handleClose}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            annuler
          </Button>
          <Button
            variant={props.type === "delete" ? "danger" : "primary"}
            form="formCreateProd"
            type="submit"
          >
            {(() => {
              switch (props.type) {
                case "create":
                  return "Créer";
                case "update":
                  return "Modifier";
                default:
                  return "Supprimer";
              }
            })()}
            le produit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductModal;
