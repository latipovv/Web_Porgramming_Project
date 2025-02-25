import { CryptosCarousel } from "./Carousel.jsx";

export default function HeroSection({currency}) {
  return (
    <div className='hero bg-cover text-center text-white'>
      <div className=' backdrop-brightness-50'>
        <div className="flex flex-col">
        <h1 className="text-center text-[#87ceeb] text-6xl font-bold font-['Montserrat'] leading-[72px] pt-[69px]">CRYPTOFOLIO WATCH LIST</h1>
        <p className=" text-center text-[#a9a9a9] text-sm font-medium font-['Montserrat'] capitalize leading-snug tracking-tight">Get all the Info regarding your favorite Crypto Currency</p>
        </div>
       
        <CryptosCarousel currency={currency}>

        </CryptosCarousel>
      </div>
    </div>
  );
}
