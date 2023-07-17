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

  const generateRandomPrice = () => {
    return Math.floor(Math.random() * 100) + 1;
  };

  const getRecipe = async () => {
    if (!drinkId) {
      return;
    }
    try {
      setLoading(true);
      const drinkData = await getRecipeService(drinkId);
      const drinkWithPrice = {
        ...drinkData,
        price: generateRandomPrice(),
      };
      setRecipe(drinkWithPrice);
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
      const drinksWithPrices = drinksData.map((drink) => ({
        ...drink,
        price: generateRandomPrice(),
      }));
      setDrinks(drinksWithPrices);
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
    <DrinksContext.Provider value={contextValues}>
      {children}
    </DrinksContext.Provider>
  );
};

DrinksProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export { DrinksContext, DrinksProvider };
