export const getCurrencyString = (value, quantity) => {
  return `R$ ${(value / 100) * quantity}`;
};

export const getCurrencyNumber = (value) => {
  return value / 100;
};
