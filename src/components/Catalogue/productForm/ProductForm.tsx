/*
  component : ProductForm
  description : Formulaire de création de produit
  props : 
    -id : string
  Components  :
    -Form
    -Row
    -Col
    -Form.Group
    -Form.Control
    -InputGroup
    -InputGroup.Text
    -Form.Label
    -Form.Control as="select"
    -Form.Control type="text"
    -Form.Control type="number"
  States :
    -products : Array<CatalogTypes.Product>
    -categories : Array<CatalogTypes.Category>

  Functions :

  hooks :
    -useSelector
    -useDispatch
    -useEffect
    -useState

*/

import React, { useState } from "react";

// store
import { useDispatch, useSelector } from "react-redux";
import { State, CatalogTypes, catalogueActionCreators } from "../../../state";
import { FormProps } from "./interfaces";

//components
import { Col, Form, Row, Container, InputGroup, Button } from "react-bootstrap";
//style & assets
import { bindActionCreators } from "redux";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProductForm = (props: FormProps) => {
  const { products, categories } = useSelector((state: State) => ({
    products: state.catalogue.products,
    categories: state.catalogue.categories,
  }));
  const [validated, setValidated] = useState(false);
  const [showPlus, setShowPlus] = useState(false);

  const dispatch = useDispatch();
  const { createProduct, updateProduct, deleteProduct, createCategory } =
    bindActionCreators(catalogueActionCreators, dispatch);
  const product =
    props.type !== "create"
      ? products.find((prod) => prod.id === props.id)
      : null;

  const createProductToSend = (
    form: EventTarget & HTMLFormElement
  ): Omit<CatalogTypes.Product, "id" | "commandNumber"> => ({
    productName: form.productName.value,
    category: form.category.value,
    price: form.price.value,
    reference: form.reference.value,
  });

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;
    if (form.checkValidity() === true) {
      createProductToSend(form);
      switch (props.type) {
        case "create":
          createProduct(createProductToSend(form));
          break;
        case "update":
          updateProduct({
            ...createProductToSend(form),
            id: props?.id,
          });
          break;
        case "delete":
          deleteProduct(props?.id);
          break;

        default:
          break;
      }

      props?.modalCloser?.();
    }
    setValidated(true);
  };

  const newCatChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "autre") {
      setShowPlus(!showPlus);
    }
  };

  return (
    <Container>
      <Form
        noValidate
        validated={validated}
        className="d-flex flex-column justify-content-around "
        onSubmit={submitHandler}
        id="formCreateProd"
      >
        <Row className="justify-content-around mb-2">
          <Col xs={5}>
            <Form.Group className="" controlId="ProdductName">
              <Form.Label>Nom du produit</Form.Label>
              <Form.Control
                readOnly={props.type === "delete"}
                disabled={props.type === "delete"}
                name="productName"
                required
                type="text"
                placeholder="Nom du produit"
                defaultValue={product?.productName ?? ""}
              />
              <Form.Control.Feedback type="invalid">
                champ obligatoire
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col xs={5}>
            <Form.Group className="" controlId="ProdductName">
              <Form.Label>Référence Produit</Form.Label>
              <Form.Control
                readOnly={props.type === "delete"}
                disabled={props.type === "delete"}
                name="reference"
                required
                type="text"
                placeholder="Référence du produit"
                defaultValue={product?.reference ?? ""}
              />
              <Form.Control.Feedback type="invalid">
                champ obligatoire
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-around mb-2">
          <Col xs={5}>
            <Form.Group className="" controlId="productCat">
              <Form.Label>Catégorie</Form.Label>

              {!showPlus ? (
                <>
                  <Form.Control
                    readOnly={props.type === "delete"}
                    disabled={props.type === "delete"}
                    name="category"
                    required
                    as="select"
                    defaultValue={product?.productName}
                    onChange={newCatChecked}
                  >
                    {[...categories].map(
                      ({ id, name }: CatalogTypes.Category, idcat: number) => (
                        <option key={idcat} defaultValue={name}>
                          {name}
                        </option>
                      )
                    )}
                    <option value="autre">autre</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    champ obligatoire
                  </Form.Control.Feedback>
                </>
              ) : (
                <InputGroup>
                  <Form.Control type=" text" name="category" required />
                  <Button
                    onClick={() => setShowPlus(!showPlus)}
                    variant="outline-danger"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                  <Form.Control.Feedback type="invalid">
                    champ obligatoire
                  </Form.Control.Feedback>
                </InputGroup>
              )}
            </Form.Group>
          </Col>
          <Col xs={5}>
            <Form.Group className="" controlId="ProdductPrice">
              <Form.Label>Prix du produit</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  readOnly={props.type === "delete"}
                  disabled={props.type === "delete"}
                  name="price"
                  required
                  type="number"
                  placeholder="Prix du produit"
                  defaultValue={product?.price ?? 0}
                />
                <InputGroup.Text>€</InputGroup.Text>
              </InputGroup>
              <Form.Control.Feedback type="invalid">
                champ obligatoire
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default ProductForm;
