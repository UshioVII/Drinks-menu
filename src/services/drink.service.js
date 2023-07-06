import axios from 'axios';

const apiUrl = import.meta.env.VITE_APi_URL;

const getRecipeService = async (drinkId) => {
    try {

        const url = `${apiUrl}lookup.php?i=${drinkId}`;

        const {data} = await axios.get(url);

        return data.drinks[0] || [];

    } catch (error) {
        console.log(error );
        throw new Error("Ocurrió un error al obtener la receta");
    }
}
const filterDrinkServices = async (name, category) => {
    try {

        const url = `${apiUrl}filter.php?i=${name}&c=${category}`;

        const {data} = await axios.get(url);

        return data.drinks || [];

    } catch (error) {
        console.log(error);
        throw new Error("Ocurrió un error al filtrar las bebidas")
    }
}
export {getRecipeService, filterDrinkServices}