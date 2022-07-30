/*
  component : ProductModal
  description : ProductCard component
  props : CatalogTypes.Product
  state : None
  components : ProductModal
  functions : None
*/

import React from "react";

//store
import { CatalogTypes } from "../../state";

//Components
import Card from "react-bootstrap/Card";
import ProductModal from "./ProductModal";

//styles & assets
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Col } from "react-bootstrap";

const ProductCard = ({
  productName,
  category,
  price,
  reference,
  commandNumber,
  id,
}: CatalogTypes.Product) => {
  return (
    <Col xs={12} s={12} md={6} lg={4} xl={3} className=" mb-2">
      <Card>
        <Card.Header className="d-flex justify-content-between">
          <h5 className="col-auto">{reference}</h5>
          <div className="row col-4 justify-content-between">
            <ProductModal
              btnClasName="col-auto"
              btnVariant="outline-warning"
              btncontent=""
              btnLogo={faPen}
              prodId={id}
              type="update"
            />
            <ProductModal
              btnClasName="col-auto"
              btnVariant="outline-danger"
              btncontent=""
              btnLogo={faTrash}
              prodId={id}
              type="delete"
            />
          </div>
        </Card.Header>
        <Card.Body>
          <Card.Title>{productName}</Card.Title>
          <Card.Subtitle className="mb-2 mt-0">{category}</Card.Subtitle>
          <Card.Text>{price} €</Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">
          {commandNumber} commandes pour ce produit
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default ProductCard;
