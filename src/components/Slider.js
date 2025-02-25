import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const services = [
  { id: 1, title: "Secure Crypto Wallet", image: "/images/wallet.jpg" },
  { id: 2, title: "Fast Transactions", image: "/images/transactions.jpg" },
  { id: 3, title: "24/7 Support", image: "/images/support.jpg" },
  { id: 4, title: "Advanced Analytics", image: "/images/analytics.jpg" },
];

const Slider = () => {
  return (
    <div className="w-full max-w-4xl mx-auto py-10">
      <h2 className="text-3xl font-bold text-center text-white mb-6">Our Services</h2>
      <Swiper
        modules={[Navigation, Autoplay, Pagination]}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        className="rounded-lg shadow-lg"
      >
        {services.map((service) => (
          <SwiperSlide key={service.id}>
            <div className="flex flex-col items-center bg-gray-800 p-6 rounded-lg shadow-md">
              <img src={service.image} alt={service.title} className="w-full h-48 object-cover rounded-lg" />
              <h3 className="text-xl text-white font-semibold mt-4">{service.title}</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
