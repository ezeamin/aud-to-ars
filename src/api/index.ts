export const getExchangeRateAUDtoUSD = async (): Promise<string> => {
  const response = await fetch(
    'https://api.exchangerate-api.com/v4/latest/EUR'
  );
  const data = await response.json();
  return (data.rates.USD || 0).toFixed(2);
};

export const getExchangeRateUSDtoARS = async (): Promise<string> => {
  const response = await fetch('https://dolarapi.com/v1/dolares/bolsa');
  const data = await response.json();

  const compra = data.compra;
  const venta = data.venta;

  const value = (compra + venta) / 2;

  return value.toFixed(2);
};
