import FertilizerCard from "./FertilizerCard";
import React from "react";

const FertilizerGrid = ({ fertilizers, deleteFertilizer, handleAddToCart }) => {
  return (
    <div className="px-10 py-4 grid gap-x-7 gap-y-6 grid-cols-[repeat(auto-fill,minmax(14rem,1fr))]">
      {fertilizers.map((fertilizer) => {
        const imageUrl = `http://localhost:8070/uploads/${fertilizer.fer_image}`;
        return (
          <FertilizerCard
            key={fertilizer._id}
            fertilizer={fertilizer}
            name={fertilizer.fer_name}
            price={fertilizer.fer_price}
            plants={fertilizer.fer_plants}
            weight={fertilizer.fer_weight}
            image={imageUrl} // Pass only the URL
            //userRole={userRole}
            handleDelete={deleteFertilizer}
            handleAddToCart={handleAddToCart} // Pass handleAddToCart down
          />
        );
      })}
    </div>
  );
};

export default FertilizerGrid;
