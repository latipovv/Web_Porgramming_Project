import { CryptosCarousel } from "./Carousel.jsx";

export default function HeroSection({ currency }) {
  return (
    <div className="bg-cover bg-center text-white py-20 px-4 text-center">
      <div className="backdrop-brightness-50 px-4">
        <div className="flex flex-col items-center">
          <h1 className="text-[#87ceeb] text-5xl md:text-6xl font-bold font-montserrat leading-tight">
            CRYPTOFOLIO WATCH LIST
          </h1>
          <p className="text-[#a9a9a9] text-sm md:text-lg font-medium font-montserrat capitalize leading-snug mt-4">
            Get all the Info regarding your favorite Crypto Currency
          </p>
        </div>

        <div className="mt-10">
          <CryptosCarousel currency={currency} />
        </div>
      </div>
    </div>
  );
}
