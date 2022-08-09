/*
  component : CategorieSelector
  description: CategorieSelector component
  props ß: empty 
  state:
    - categories: {(CatalogTypes.Category | undefined)[]}
  components: None
  functions: setCheckedCategory
  hooks:
    - useSelector
    - useDispatch
    - bindActionCreators
  actions:
    - setCheckedCategory
    

*/

import React, { useRef, useState } from "react";

// store
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { catalogueActionCreators, State, CatalogTypes } from "../../state";
//components
import { Button, Form, ListGroup, Row, Placeholder } from "react-bootstrap";

// styles & assets
import "./prodRow.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const CategorieSelector = () => {
  const dispatch = useDispatch();
  const { setCheckedCategory, createCategory } = bindActionCreators(
    catalogueActionCreators,
    dispatch
  );
  const { categories, checkedCat } = useSelector(
    (state: State) => state.catalogue
  );
  const [newCategory, setNewCategory] = useState("");

  const [showPlus, setShowPlus] = useState(true);
  const category = useRef(null);
  const createCategoryEventCback = () => {
    createCategory(newCategory);
    setShowPlus(!showPlus);
  };

  return (
    <ListGroup as="ul">
      {
        // loop through categories and add a master category to check all
        categories.length > 0
          ? [{ id: "all", name: "toutes" }, ...categories].map(
              (category, idcat: number) => (
                // add a checkbox for each category
                <ListGroup.Item
                  action
                  as="li"
                  key={idcat}
                  active={category.name === checkedCat}
                  value={category.name}
                  onClick={() => setCheckedCategory(category.name)}
                >
                  {category.name}
                </ListGroup.Item>
              )
            )
          : [
              ...Array(3).map(
                (_, id) => new CatalogTypes.CategoryClass(NaN, ``)
              ),
            ].map((_, id) => (
              <Placeholder
                as="li"
                className="list-group-item list-group-item-action"
                animation="glow"
              >
                <Placeholder as="p" xs={12} className="h-100 m-0" />
              </Placeholder>
            ))
      }
      {categories.length > 0 && (
        <ListGroup.Item action as="li" className="text-center">
          {showPlus ? (
            <Row
              className={`justify-content-center ${showPlus ? "px-0" : ""}`}
              onClick={() => setShowPlus(!showPlus)}
            >
              <FontAwesomeIcon icon={faPlus} />
            </Row>
          ) : (
            <>
              <Row>
                <Form.Control
                  name="category"
                  type="text"
                  placeholder="Nom du produit"
                  onInput={(e) =>
                    setNewCategory((e.target as HTMLInputElement).value)
                  }
                  ref={category}
                />
              </Row>
              <Row className="justify-content-between mt-1">
                <Button
                  className="col-auto"
                  onClick={() => createCategoryEventCback()}
                >
                  Ajouter
                </Button>
                <Button
                  className="col-auto"
                  variant="danger"
                  onClick={() => setShowPlus(!showPlus)}
                >
                  Annuler
                </Button>
              </Row>
            </>
          )}
        </ListGroup.Item>
      )}
    </ListGroup>
  );
};

export default CategorieSelector;
