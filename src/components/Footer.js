import React from "react";
import { useSelector } from "react-redux";
import { Carousel } from "flowbite-react";

const chunkArray = (arr, size) =>
  arr.reduce((chunks, _, i) => (i % size === 0 ? [...chunks, arr.slice(i, i + size)] : chunks), []);

export function CryptosCarousel({ currency }) {
  const { selectedCryptos } = useSelector((state) => state.selectedCryptos);
  const chunkedCryptos = chunkArray(selectedCryptos, 4);

  return (
    <div className="h-[187px] mt-[70px] pb-[30px] flex justify-center items-center">
      <Carousel indicators={false} rightControl=" " leftControl=" " className="w-[1232px]" slideInterval={3000}>
        {chunkedCryptos.map((cryptoGroup, index) => (
          <div key={index} className="flex justify-around items-center h-full">
            {cryptoGroup.map(({ id, image, symbol, price_change_percentage_24h_in_currency, current_price }) => (
              <div key={id} className="flex flex-col items-center">
                <img src={image} alt={`${symbol} logo`} className="w-20 h-20 mx-auto mb-2" />
                <div className="flex items-center gap-2 mt-[10px]">
                  <p className="text-white text-base font-normal uppercase">{symbol}</p>
                  <p className={`text-sm font-medium ${price_change_percentage_24h_in_currency > 0 ? "text-green-500" : "text-red-500"}`}>
                    {price_change_percentage_24h_in_currency > 0 ? "+" : ""}
                    {price_change_percentage_24h_in_currency.toFixed(2)}%
                  </p>
                </div>
                <p className="text-white text-lg font-medium uppercase">
                  {currency === "rub" ? "₽ " : currency === "usd" ? "$ " : "€ "}{current_price.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        ))}
      </Carousel>
    </div>
  );
}
