import React, { useState } from "react";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";

const ProductForm = ({ addProduct, darkMode }) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price || quantity <= 0 || price <= 0) {
      setMessage("Please fill all fields correctly");
      setError(true);
      setTimeout(() => setMessage(""), 2500);
      return;
    }
    addProduct({ name, quantity: Number(quantity), price: Number(price) });
    setName("");
    setQuantity(1);
    setPrice("");
    setMessage("Product added successfully");
    setError(false);
    setTimeout(() => setMessage(""), 2500);
  };

  return (
    <div className="w-full max-w-2xl mb-6">
      <form onSubmit={handleSubmit} className={`flex flex-col gap-4 p-6 rounded-xl shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`p-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-purple-500 ${darkMode ? "bg-gray-700 text-white border-gray-600" : "bg-gray-100 text-black border-gray-300"}`}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className={`p-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-purple-500 ${darkMode ? "bg-gray-700 text-white border-gray-600" : "bg-gray-100 text-black border-gray-300"}`}
          min="1"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className={`p-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-purple-500 ${darkMode ? "bg-gray-700 text-white border-gray-600" : "bg-gray-100 text-black border-gray-300"}`}
          min="0"
          step="0.01"
        />
        <button className="bg-purple-600 hover:bg-purple-700 transition text-white font-bold py-3 rounded-md shadow-lg">
          Add Product
        </button>
      </form>

      {message && (
        <div className={`flex items-center gap-2 mt-3 font-semibold text-lg animate-pulse ${error ? "text-red-500" : "text-green-400"}`}>
          {error ? <FiXCircle size={24} /> : <FiCheckCircle size={24} />}
          {message}
        </div>
      )}
    </div>
  );
};

export default ProductForm;
