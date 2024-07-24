export const Add = (prod) => {
  return {
    type: "ADD",
    payload: prod,
  };
};

export const remove = (prod) => {
  return {
    type: "REMOVE",
    payload: prod,
  };
};
