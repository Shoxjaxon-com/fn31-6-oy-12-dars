import React, { useState } from 'react';

function Hero() {
  const images = [
    'https://react-vite-comfy-store-v2.netlify.app/assets/hero1-deae5a1f.webp',
    'https://react-vite-comfy-store-v2.netlify.app/assets/hero2-1b236db2.webp',
    'https://react-vite-comfy-store-v2.netlify.app/assets/hero3-22de0ee5.webp',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="max-w-[1200px] mx-auto mt-16 px-4">
      <div className="flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0 lg:space-x-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          We are changing <br /> the way people <br /> shop
          </h1>
          <p className="mt-8 text-lg leading-8">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. <br /> Tempore repellat explicabo enim soluta temporibus <br /> asperiores aut obcaecati perferendis porro nobis.
          </p>
          <button className="mt-5 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
            OUR PRODUCTS
          </button>
        </div>

        <div className="relative w-full lg:w-1/2 h-[400px] overflow-hidden rounded-lg shadow-lg">
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            ))}
          </div>
          <button
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
            onClick={prevSlide}
          >
            &#8249;
          </button>
          <button
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
            onClick={nextSlide}
          >
            &#8250;
          </button>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  currentIndex === index ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-16 mb-16">
        <h2 className="text-3xl font-semibold mb-4">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 cursor-pointer">
          {[
            {
              src: 'https://images.pexels.com/photos/943150/pexels-photo-943150.jpeg?auto=compress&cs=tinysrgb&w=1600',
              title: 'Avant-garde Lamp',
              price: '$179.99',
            },
            {
              src: 'https://images.pexels.com/photos/3679601/pexels-photo-3679601.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
              title: 'Coffee Table',
              price: '$179.99',
            },
            {
              src: 'https://images.pexels.com/photos/1034584/pexels-photo-1034584.jpeg?auto=compress&cs=tinysrgb&w=1600',
              title: 'Modern Chair',
              price: '$129.99',
            },
          ].map((product, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <img
                src={product.src}
                alt={product.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-center">{product.title}</h3>
                <p className="mt-2 text-gray-600 text-center">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Hero;
