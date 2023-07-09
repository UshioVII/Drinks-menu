import { useState, useEffect, createContext } from "react";
import PropTypes from 'prop-types';
import { filterDrinkServices, getRecipeService } from "../services/drink.service";

const DrinksContext = createContext();

const DrinksProvider = ({ children }) => {
  const [drinks, setDrinks] = useState([]);
  const [modal, setModal] = useState(false);
  const [drinkId, setDrinkId] = useState(null);
  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(false);

  const handleModalClick = () => {
    setModal(!modal);
  };

  const handleDrinkIdClick = (id) => {
    setDrinkId(id);
  };

  const getRecipe = async () => {
    if (!drinkId) {
      return;
    }
    try {
      setLoading(true);
      const recipeData = await getRecipeService(drinkId);
      setRecipe(recipeData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getDrink = async (data) => {
    try {
      setLoading(true);
      const drinksData = await filterDrinkServices(data.name, data.category);
      setDrinks(drinksData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRecipe();
  }, [drinkId]);

  const contextValues = {
    drinks,
    modal,
    recipe,
    loading,
    handleModalClick,
    handleDrinkIdClick,
    getDrink
  };

  return (
    <DrinksContext.Consumer>
      {() => (
        <DrinksContext.Provider value={contextValues}>
          {children}
        </DrinksContext.Provider>
      )}
    </DrinksContext.Consumer>
  );
};

DrinksProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export { DrinksContext, DrinksProvider };
