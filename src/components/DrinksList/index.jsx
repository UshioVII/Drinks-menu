import { Row } from "react-bootstrap";
import { useDrinks } from "../../hooks/useDrinks";
import styles from "./DrinksList.module.css";
import DrinkCard from "../DrinkCard";

export default function DrinkList() {
  const { drinks } = useDrinks();

  if (drinks.length === 0) {
    return (
      <Row className={styles.noResult}>
        <h1>No hay resultados</h1>
      </Row>
    );
  }

  return (
    
    <Row className={styles.DrinkList}>
      {drinks.map((drink) => (
        <DrinkCard key={drink.idDrink} drink={drink} />
      ))}
    </Row>
  );
}
