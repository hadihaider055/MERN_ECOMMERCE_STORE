const initialState = {
  checkoutHistory: [],
  checkoutModalState: [{ isOpen: false, userId: null }],
};

const checkoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHECKOUT_HISTORY":
      return {
        ...state,
        checkoutHistory: action.payload,
      };
    case "CHECKOUT_MODAL_STATE":
      return {
        ...state,
        checkoutModalState: action.payload,
      };
    case "CHECKOUT_MODAL_CLOSE":
      return {
        ...state,
        checkoutModalState: action.payload,
      };
    default:
      return state;
  }
};

export default checkoutReducer;
