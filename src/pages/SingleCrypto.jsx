import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Chart from 'react-apexcharts';
import { formatMarketCap } from '../utils/helper';

const SingleCrypto = ({ currency }) => {
  const { id } = useParams();
  const [crypto, setCrypto] = useState(null);
  const [timePeriod, setTimePeriod] = useState('24h');
  const [chartData, setChartData] = useState([]);

  const fetchMarketChartData = async (currency, days) => {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`
    );
    const data = await response.json();
    return data.prices;
  };

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
        const data = await response.json();
        setCrypto(data);

        let days;
        switch (timePeriod) {
          case '24h':
            days = 1;
            break;
          case '30 days':
            days = 30;
            break;
          case '3 months':
            days = 90;
            break;
          case '1 year':
            days = 365;
            break;
          default:
            days = 1;
        }

        const prices = await fetchMarketChartData(currency, days);
        setChartData(prices.map(price => ({ x: new Date(price[0]).getTime(), y: price[1] })));
      } catch (error) {
        console.error('Error fetching cryptocurrency data:', error);
      }
    };

    fetchCryptoData();
  }, [id, currency, timePeriod]);

  if (!crypto) return <p>Loading...</p>;

  const chartOptions = {
    chart: {
      id: 'crypto-chart',
      type: 'line',
      zoom: { enabled: false },
      toolbar: { show: false },
      background: 'transparent',
    },
    xaxis: {
      type: 'datetime',
      labels: {
        style: {
          colors: '#999999',
          fontSize: '10px',
        },
        format: 'HH:mm',
        rotateAlways: true,
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        formatter: (value) => `${value.toLocaleString()}`,
        style: {
          colors: '#999999',
          fontSize: '10px',
        },
      },
    },
    grid: {
      show: true,
      borderColor: '#2d2d2d',
      strokeDashArray: 5,
      xaxis: {
        lines: { show: true }
      },
      yaxis: {
        lines: { show: true }
      },
      padding: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10
      },
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    colors: ['#00E7FF'],
    tooltip: {
      x: {
        format: 'dd MMM yyyy HH:mm',
      },
      y: {
        formatter: (value) => `${currency.toUpperCase()} ${value.toLocaleString()}`,
      },
      theme: 'dark',
    },
    dataLabels: {
      enabled: false,
    },
  };

  const chartSeries = [
    {
      name: crypto?.name || 'Price',
      data: chartData,
    },
  ];
  const periods = [
    { label: '24 Hours', value: '24h' },
    { label: '30 Days', value: '30d' },
    { label: '3 Months', value: '3m' },
    { label: '1 Year', value: '1y' }
  ];

  


  return (
    <div className="bg-transparent text-white flex flex-row p-6 h-[678px]">
      
      <div className=" bg-inherit p-6  w-[548px] flex flex-col items-center border-[#808080] border-r-2">
        <div className="mb-4">
          <img
            src={crypto.image.large}
            alt={`${crypto.name} logo`}
            className="h-[200px] w-[200px]"
          />
        </div>
        <h1 className="mb-4 text-white text-5xl font-bold font-['Montserrat'] leading-[56.02px]">{crypto.name}</h1>
        <div className="info flex flex-col items-left">
          <p className="text-left mb-6 text-white text-base font-normal font-['Montserrat'] leading-7 tracking-tight">
            {crypto.description.en.split('.')[0]}
          </p>
          <p className="text-left text-white text-2xl font-bold font-['Montserrat'] leading-loose">
            Rank: {crypto.market_cap_rank}
          </p>
          <p className="text-white text-2xl font-bold font-['Montserrat'] leading-loose">
            Current Price: {currency === 'rub' ? '₽' : currency === 'usd' ? '$' : '€'}
            {crypto.market_data.current_price[currency.toLowerCase()].toLocaleString()}
          </p>
          <p className="text-left text-white font-bold font-['Montserrat'] leading-loose text-2xl">
            Market Cap: {currency === 'rub' ? '₽' : currency === 'usd' ? '$' : '€'}
            {formatMarketCap(crypto.market_data.market_cap[currency.toLowerCase()])}
          </p>
        </div>
      </div>

      <div className=" bg-transparent p-6  w-[1000px] ">
        

        <Chart
          options={chartOptions}
          series={chartSeries}
          type="line"
          height={400}
         
        />
        <div className="flex justify-center mb-6 w-full ">
          <div className="flex bg-transparent p-1 pl-3 w-full gap-7 rounded-lg">
            {periods.map((period) => (
              <button
                key={period.value}
                onClick={() => setTimePeriod(period.value)}
                className={`px-4 py-2 w-[220px] rounded-md text-left text-sm font-medium transition-colors duration-200 border-[#87ceeb] border-[1px] 
                  ${timePeriod === period.value 
                    ? 'bg-[#87ceeb] text-black' 
                    : 'bg-transparent text-white hover:bg-gray-600'}`}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default SingleCrypto;