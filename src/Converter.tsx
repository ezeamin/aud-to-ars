import React, { useState, useEffect } from 'react';

type Props = {
  exchangeRateAUDtoUSD: string | null;
  exchangeRateUSDtoARS: string | null;
};

const Converter = (props: Props) => {
  const { exchangeRateAUDtoUSD, exchangeRateUSDtoARS } = props;
  const [aud, setAud] = useState<number | string>('');
  const [ars, setArs] = useState<number | string>('');
  const [usd, setUsd] = useState<number | string>('');

  useEffect(() => {
    if (aud === '') {
      setArs('');
      setUsd('');
      return;
    }

    if (exchangeRateAUDtoUSD && exchangeRateUSDtoARS && aud !== '') {
      const usdValue = parseFloat(aud as string) * Number(exchangeRateAUDtoUSD);
      const convertedArs = usdValue * Number(exchangeRateUSDtoARS);
      setUsd(usdValue.toFixed(2));
      setArs(convertedArs.toFixed(2));
    }
  }, [aud, exchangeRateAUDtoUSD, exchangeRateUSDtoARS]);

  const handleAudChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAud(value);
  };

  return (
    <form className='flex flex-col gap-4 text-center'>
      <label className='input input-xl w-full'>
        <span className='label'>EUR 🇪🇺</span>
        <input
          autoFocus
          type='number'
          inputmode='numeric'
          placeholder='xx.xx'
          value={aud}
          onChange={handleAudChange}
        />
      </label>
      <div className='my-10'>
        <p className='text-sm'>
          {(parseFloat(usd as string) || 0).toLocaleString('es-AR', {
            style: 'currency',
            currency: 'USD',
          })}
        </p>
        <p className='text-4xl'>
          ARS{' '}
          <span className='font-bold'>
            {(parseFloat(ars as string) || 0).toLocaleString('es-AR', {
              style: 'currency',
              currency: 'ARS',
            })}
          </span>
        </p>
      </div>
    </form>
  );
};

export default Converter;
