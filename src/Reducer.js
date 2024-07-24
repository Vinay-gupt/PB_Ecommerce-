const initialState = { Product: [] };

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD":
      // console.log(state.Product);
      return {
        ...state,
        Product: [...state.Product, { ...action.payload }],
      };

    case "REMOVE":
      return {
        ...state,
        Product: [
          ...state.Product.filter((prod) => prod.id !== action.payload),
        ],
      };
    default:
      return state;
  }
};

export default Reducer;
