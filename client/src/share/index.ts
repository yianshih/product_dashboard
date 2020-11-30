
// check if input n is numeric
export const isNumeric = (n: any) => {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
