const initialState = {
  allProducts: [],
  product: {},
  cart: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_PRODUCTS":
      return { ...state, allProducts: action.payload };
    case "GET_PRODUCT_BY_ID":
      return { ...state, product: action.payload };
    case "DELETE_PRODUCT":
      return {
        ...state,
        allProducts: state.allProducts.filter(
          (product) => product._id !== action.payload
        ),
      };
    case "ADD_TO_CART":
      const result = state.allProducts.filter((product) => {
        return product._id === action.payload._id;
      });
      if (result) {
        return {
          ...state,
          cart: [...state.cart, { ...result, quantity: 1 }],
        };
      }
      break;
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: [
          ...state.cart.filter((product) => product[0]._id !== action.payload),
        ],
      };
    case "REMOVE_ALL":
      return {
        ...state,
        cart: [],
      };
    case "PRODUCT_INCREMENT":
      state.cart.forEach((item) => {
        if (item[0]._id === action.payload[0]._id) {
          return (item.quantity += 1);
        }
      });
      return {
        ...state,
        cart: [...state.cart],
      };
    case "PRODUCT_DECREMENT":
      state.cart.forEach((item) => {
        if (item[0]._id === action.payload[0]._id) {
          return item.quantity === 1
            ? (item.quantity = 1)
            : (item.quantity -= 1);
        }
      });
      return {
        ...state,
        cart: [...state.cart],
      };
    case "REMOVE_PRODUCT_DETAILS":
      return {
        ...state,
        product: [],
      };
    default:
      return state;
  }
};

export default productReducer;
