import { useEffect, useState } from 'react';
import Converter from './Converter';
import { getExchangeRateAUDtoUSD, getExchangeRateUSDtoARS } from './api';
import ConversionRate from './ConversionRate';

const App = () => {
  const [exchangeRateAUDtoUSD, setExchangeRateAUDtoUSD] = useState<
    string | null
  >(null);
  const [exchangeRateUSDtoARS, setExchangeRateUSDtoARS] = useState<
    string | null
  >(null);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      const rateInUSD = await getExchangeRateAUDtoUSD();
      setExchangeRateAUDtoUSD(rateInUSD);
      const rateUSDtoARS = await getExchangeRateUSDtoARS();
      setExchangeRateUSDtoARS(rateUSDtoARS);
    };

    fetchExchangeRates();
  }, []);

  if (!exchangeRateAUDtoUSD || !exchangeRateUSDtoARS) {
    return (
      <main className='px-5 h-dvh flex-col bg-slate-800 flex items-center justify-center'>
        <h1 className='text-lg'>Cargando...</h1>
      </main>
    );
  }

  return (
    <main className='px-6 h-dvh flex-col bg-slate-800 flex items-center justify-center'>
      <Converter
        exchangeRateAUDtoUSD={exchangeRateAUDtoUSD}
        exchangeRateUSDtoARS={exchangeRateUSDtoARS}
      />
      <p className='text-sm mt-10'>1 AUD = {exchangeRateAUDtoUSD} USD</p>
      <p className='text-sm'>1 USD = {exchangeRateUSDtoARS} ARS (MEP)</p>
      <ConversionRate
        exchangeRateAUDtoUSD={exchangeRateAUDtoUSD}
        exchangeRateUSDtoARS={exchangeRateUSDtoARS}
      />
    </main>
  );
};
export default App;
