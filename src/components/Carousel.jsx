import React from "react";
import { useSelector } from "react-redux";
import { Carousel } from "flowbite-react";

function chunkArray(arr, size) {
  const chunkedArr = [];
  for (let i = 0; i < arr.length; i += size) {
    chunkedArr.push(arr.slice(i, i + size));
  }
  return chunkedArr;
}

export function CryptosCarousel({currency}) {
  const { selectedCryptos } = useSelector((state) => state.selectedCryptos);

  const chunkedCryptos = chunkArray(selectedCryptos, 4);
  
  return (
    <div className=" h-[187px] mt-[70px] pb-[30px] flex justify-center items-center">
      <Carousel indicators={false} rightControl=" " leftControl=" " className="w-[1232px]"slideInterval={3000}>
        {chunkedCryptos.map((cryptoGroup, index) => (
          <div key={index} className="flex justify-around items-center h-full">
            {cryptoGroup.map((crypto) => (
              <div key={crypto.id} className="items-center flex justify-center flex-col">
                <img
                  src={crypto.image}
                  alt={`${crypto.name} logo`}
                  className="w-20 h-20 mx-auto mb-2"
                />
                <div className="flex items-center gap-2 mt-[10px]">
                  <p className=" text-white text-base font-normal font-['Roboto'] uppercase">
                    {crypto.symbol}
                  </p>
                  <p
                        className={`text-right ${
                          
                            crypto.price_change_percentage_24h_in_currency
                           > 0
                            ? "text-[#0ecb81]"
                            : "text-red-600"
                        } text-sm font-medium font-['Roboto'] leading-tight tracking-tight`}
                      >
                        {parseFloat(
                          crypto.price_change_percentage_24h_in_currency
                        ) > 0
                          ? "+"
                          : ""}
                        {parseFloat(
                          crypto.price_change_percentage_24h_in_currency
                        ).toFixed(2)}
                        %
                      </p>

                </div>

                <p className=" text-white text-[21.83px] font-medium font-['Roboto'] uppercase">
                {currency === "rub" ? "₽ " : currency === "usd" ? "$ " : "€ "}{crypto.current_price.toFixed(2)}
                </p>
                
              </div>
            ))}
          </div>
        ))}
      </Carousel>
    </div>
  );
}
