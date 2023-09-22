export const convertUSDToRupiah = usdAmount => {
  const conversionRate = 14300;

  const rupiahAmount = usdAmount * conversionRate;

  return rupiahAmount;
};
