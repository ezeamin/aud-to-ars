import { useEffect, useState } from 'react';

type Props = {
  exchangeRateAUDtoUSD: string | null;
  exchangeRateUSDtoARS: string | null;
};

const lastRate = Number(localStorage.getItem('lastRate') || '0');

const ConversionRate = (props: Props) => {
  const { exchangeRateAUDtoUSD, exchangeRateUSDtoARS } = props;
  const [trend, setTrend] = useState<'up' | 'down' | 'same'>('same');

  useEffect(() => {
    const currentRate =
      Number(exchangeRateAUDtoUSD) * Number(exchangeRateUSDtoARS);

    if (currentRate > lastRate) {
      setTrend('up');
    } else if (currentRate < lastRate) {
      setTrend('down');
    } else {
      setTrend('same');
    }

    localStorage.setItem('lastRate', currentRate.toString());
  }, [exchangeRateAUDtoUSD, exchangeRateUSDtoARS]);

  const renderTrendIcon = () => {
    if (trend === 'up') {
      return <span className='text-red-500'>▲</span>;
    } else if (trend === 'down') {
      return <span className='text-green-500'>▼</span>;
    } else {
      return <span className='text-blue-500'>●</span>;
    }
  };

  return (
    <>
      <p className='text-sm font-bold mt-5'>
        1 AUD ={' '}
        {(Number(exchangeRateAUDtoUSD) * Number(exchangeRateUSDtoARS)).toFixed(
          2
        )}{' '}
        ARS {renderTrendIcon()}
      </p>
      <p className='text-xs'>Antes: 1 AUD = {lastRate.toFixed(2)} ARS</p>
    </>
  );
};

export default ConversionRate;
