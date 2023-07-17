import { Col, Card, Button, Row } from "react-bootstrap";
import { useDrinks } from "../../hooks/useDrinks";
import { useCart } from "../../hooks/useCart"

import PropTypes from "prop-types";

export default function DrinkCard({ drink }) {
  const { handleModalClick, handleDrinkIdClick } = useDrinks();

  const { addToCart } = useCart();

  function handleAddToCart(drink) {
    addToCart(drink)
  }

  return (
    <Col md={6} lg={3} >
      <Card className="mb-4">
        <Card.Img
          varient="top"
          src={drink.strDrinkThumb}
          alt={`Imagen de ${drink.strDrink}`}
        />

        <Card.Body>

          <Card.Title>{drink.strDrink}</Card.Title>
          <Card.Subtitle style={{ marginBottom: 2 }}>
            $ {drink.price !== undefined ? drink.price : 'Precio no disponible'}
          </Card.Subtitle>

          <Row>
            <Col >
              <Button
                variant="warning"
                className="text-uppercase"
                onClick={() => {
                  handleModalClick();
                  handleDrinkIdClick(drink.idDrink);
                }}
              >
                Ver Receta
              </Button>
            </Col>
            <Col >
              <Button
                variant="primary"
                className="text-uppercase"
                onClick={() => handleAddToCart(drink)}
              >
                Agregar al carrito
              </Button>
            </Col>
          </Row>

        </Card.Body>
      </Card>
    </Col>
  )
}


DrinkCard.propTypes = {
  drink: PropTypes.shape({
    strDrinkThumb: PropTypes.string.isRequired,
    strDrink: PropTypes.string.isRequired,
    idDrink: PropTypes.string.isRequired,
    price: PropTypes.number,
  }).isRequired,
};