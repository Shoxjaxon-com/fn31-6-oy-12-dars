import React from 'react';
import { useNavigate } from 'react-router-dom';

function Card({ id, images, price, title }) {


    const navigate = useNavigate()

    function handleNavigate(e){
        e.preventDefault();
        navigate(`/product/${id}`)
    }

  return (
    <div className="shadow-md rounded-md p-4 bg-white text-center" onClick={handleNavigate}>
      <img
        className="rounded-xl h-64 w-full object-cover mb-4"
        src={images}
        alt={title}
      />
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <p className="text-gray-600 font-semibold">${price}</p>
    </div>
  );
}

export default Card;
