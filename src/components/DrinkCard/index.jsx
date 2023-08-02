import { Col, Card } from "react-bootstrap";
import { useDrinks } from "../../hooks/useDrinks";
import { useCart } from "../../hooks/useCart";
import PropTypes from "prop-types";
import styles from "./DrinkCard.module.css";

export default function DrinkCard({ drink }) {
  const { handleModalClick, handleDrinkIdClick } = useDrinks();
  const { addToCart } = useCart();

  function handleAddToCart(drink) {
    addToCart(drink);
  }

  return (
    <Col xs={12} sm={6} md={4} lg={3} className={styles.drinkCard}>
      <Card className={`mb-4 ${styles.card}`}>
        <Card.Img
          variant="top"
          src={drink.strDrinkThumb}
          alt={`Imagen de ${drink.strDrink}`}
          className={styles.drinkImage}
        />

        <Card.Body className={styles.cardBody}>
          <Card.Title className={styles.drinkTitle}>{drink.strDrink}</Card.Title>
          <Card.Subtitle className={styles.drinkPrice}>
            $ {drink.price !== undefined ? drink.price : 'Precio no disponible'}
          </Card.Subtitle>

          <div className={`d-flex flex-wrap justify-content-md-start justify-content-lg-start gap-2 ${styles.buttonContainer}`}>
            <button
              className={styles.recipeButton}
              onClick={() => {
                handleModalClick();
                handleDrinkIdClick(drink.idDrink);
              }}
            >
              Ver Receta
            </button>

            <button
              className={styles.addToCartButton}
              onClick={() => handleAddToCart(drink)}
            >
              Agregar al carrito
            </button>
          </div>



        </Card.Body>
      </Card>
    </Col>
  );
}

DrinkCard.propTypes = {
  drink: PropTypes.shape({
    strDrinkThumb: PropTypes.string.isRequired,
    strDrink: PropTypes.string.isRequired,
    idDrink: PropTypes.string.isRequired,
    price: PropTypes.number,
  }).isRequired,
};
