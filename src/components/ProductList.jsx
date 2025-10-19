import React from "react";
import { FiTrash2 } from "react-icons/fi";

const ProductList = ({ products, deleteProduct, darkMode, currency }) => {
  const formatPrice = (price) => {
    switch(currency){
      case "USD": return `$${price.toFixed(2)}`;
      case "EUR": return `€${price.toFixed(2)}`;
      case "CRC": return `₡${price.toFixed(2)}`;
      default: return `$${price.toFixed(2)}`;
    }
  }

  return (
    <div className={`w-full max-w-2xl rounded-xl p-6 shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"} mb-6`}>
      {products.length === 0 ? (
        <p className="text-gray-400">No products added</p>
      ) : (
        <ul className="space-y-3">
          {products.map((p, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-3 rounded-lg shadow-sm border border-gray-600 transform transition-all duration-300 ease-in-out hover:scale-105 hover:bg-purple-700 hover:text-white opacity-0 animate-fadeIn"
            >
              <span>
                {p.name}: {p.quantity} {p.quantity === 1 ? "unit" : "units"} | {formatPrice(p.price * p.quantity)}
              </span>
              <button onClick={() => deleteProduct(index)} className="text-red-500 hover:text-red-700 transition">
                <FiTrash2 size={20} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;
