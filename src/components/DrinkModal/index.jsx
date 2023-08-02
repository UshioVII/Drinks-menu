import { Modal, Image } from "react-bootstrap";
import { useDrinks } from "../../hooks/useDrinks";
import styles from "./DrinkModal.module.css"


export default function DrinkDetailModal() {
  const { modal, handleModalClick, recipe, loading } = useDrinks();

  function showIngredients() {
    let ingredients = [];

    for (let index = 1; index < 16; index++) {
      if (recipe[`strIngredient${index}`]) {
        ingredients.push(
          <li key={index}>
            {recipe[`strIngredient${index}`]} {recipe[`strMeasure${index}`]}
          </li>
        );
      }
    }

    return ingredients;
  }

  return (
    !loading && (
      <Modal show={modal} onHide={handleModalClick} >
        <Image
          src={recipe.strDrinkThumb}
          alt={`Imagen receta ${recipe.strDrink}`}
        />
        <Modal.Header  className={styles.recipeDetail}>
          <Modal.Title>{recipe.strDrink}</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.recipeDetail}>
          <div className="p-3">
            <h2>Instrucciones</h2>
            {recipe.strInstructions}
            <h2>Ingredientes y Cantidad</h2>
            <ul>{showIngredients()}</ul>
          </div>
        </Modal.Body>
      </Modal>
    )
  );
}
