import { actionTypes } from "../action/cart.action";

export const cartInitialState = {
  cartItems: [],
};

export function cartReducer(state, { type, payload = [] }) {
  const { idDrink } = payload;
  let drinkIsInCart = state.cartItems.find((item) => item.idDrink === idDrink);

  switch (type) {
    case actionTypes.ADD_TO_CART:
  if (drinkIsInCart) {
    const cartItemsUpdated = state.cartItems.map((item) => {
      if (item.idDrink === idDrink) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });

    return {
      ...state,
      cartItems: cartItemsUpdated,
    };
  } else {
    payload.quantity = 1;
    return {
      ...state,
      cartItems: [...state.cartItems, payload],
    };
  }
    case actionTypes.REMOVE_ONE_FROM_CART:
      if (drinkIsInCart && drinkIsInCart.quantity > 1) {
        let cartItemsUpdated = state.cartItems.map((item) => {
          if (item.idDrink === idDrink) {
            return {
              ...item,
              quantity: item.quantity - 1,
            };
          }
          return item;
        });
        return {
          ...state,
          cartItems: cartItemsUpdated,
        };
      } else {
        let cartItemsUpdated = state.cartItems.filter(
          (item) => item.idDrink !== idDrink
        );
        return {
          ...state,
          cartItems: cartItemsUpdated,
        };
      }
    case actionTypes.REMOVE_ALL_FROM_CART:
      if (drinkIsInCart) {
        let cartItemsUpdated = state.cartItems.filter(
          (item) => item.idDrink !== idDrink
        );
        return {
          ...state,
          cartItems: cartItemsUpdated,
        };
      }
      return state;
    case actionTypes.CLEAR_CART:
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
}
