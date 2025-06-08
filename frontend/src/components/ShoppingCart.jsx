import { PiMinus, PiPlus, PiTrash } from "react-icons/pi";
import React from "react";

const ShoppingCart = ({ cartItems, onRemove, onUpdateQuantity, totalCost }) => {
  return (
    <div className="relative">
      <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
        🛒 Shopping Bag ({cartItems.length})
      </button>
      {cartItems.length > 0 && (
        <div className="absolute right-0 mt-2 bg-white border shadow-lg p-4 rounded-md w-72">
          <ul className="space-y-3">
            {cartItems.map((item) => (
              <li key={item._id} className="flex justify-between items-center">
                <div>
                  <p>{item.fer_name}</p>
                  <p>{item.fer_weight}</p>
                  <p>
                    Rs. {item.fer_price} x {item.quantity}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    className="p-1"
                    onClick={() => onUpdateQuantity(item._id, -1)}
                  >
                    <PiMinus />
                  </button>
                  <button
                    className="p-1"
                    onClick={() => onUpdateQuantity(item._id, 1)}
                  >
                    <PiPlus />
                  </button>
                  <button
                    className="p-1 text-red-500"
                    onClick={() => onRemove(item._id)}
                  >
                    <PiTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <strong>Total: Rs. {totalCost}</strong>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
