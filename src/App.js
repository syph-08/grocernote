import React, { useState, useEffect } from "react";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import TotalCard from "./components/TotalCard";
import { FiMoon, FiSun } from "react-icons/fi";

function App() {
  // Recuperar valores guardados en LocalStorage al iniciar
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("products");
    return saved ? JSON.parse(saved) : [];
  });

  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : true;
  });

  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem("currency") || "USD";
  });

  const [search, setSearch] = useState("");

  // Guardar cambios en LocalStorage
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("currency", currency);
  }, [currency]);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const addProduct = (product) => setProducts([...products, product]);
  const deleteProduct = (index) => setProducts(products.filter((_, i) => i !== index));

  return (
    <div className={`${darkMode ? "bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white" : "bg-gray-100 text-black"} min-h-screen flex flex-col items-center p-6 transition-colors`}>

      {/* Header */}
      <div className="flex w-full max-w-2xl justify-between items-center mb-4 flex-wrap gap-2">
        <h1 className="text-3xl font-extrabold tracking-tight">GrocerNote 🛒</h1>
        <div className="flex gap-2 flex-wrap items-center">

          {/* Currency Selector con flecha personalizada */}
          <div className="relative">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="bg-gray-700 text-white dark:bg-gray-200 dark:text-black px-3 py-2 pr-10 rounded shadow hover:scale-105 transition text-sm sm:text-base appearance-none"
            >
              <option value="USD">USD $</option>
              <option value="EUR">EUR €</option>
              <option value="CRC">CRC ₡</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <svg className="w-4 h-4 text-white dark:text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Light/Dark Mode */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center gap-2 bg-gray-700 dark:bg-gray-200 dark:text-black text-white px-4 py-2 rounded shadow hover:scale-105 transition text-sm sm:text-base"
          >
            {darkMode ? <FiSun /> : <FiMoon />} {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={`w-full max-w-2xl p-3 rounded-md mt-4 mb-6 focus:outline-none focus:ring-2 focus:ring-purple-500 ${darkMode ? "bg-gray-700 text-white border-gray-600" : "bg-gray-100 text-black border-gray-300"}`}
      />

      {/* Form */}
      <ProductForm addProduct={addProduct} darkMode={darkMode} />

      {/* Product List */}
      <ProductList
        products={products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))}
        deleteProduct={deleteProduct}
        darkMode={darkMode}
        currency={currency}
      />

      {/* Total */}
      <TotalCard products={products} currency={currency} />

    </div>
  );
}

export default App;