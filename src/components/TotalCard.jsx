import React, { useEffect, useState } from "react";

const TotalCard = ({ products, currency }) => {
  const [animate, setAnimate] = useState(false);

  const formatPrice = (price) => {
    switch(currency){
      case "USD": return `$${price.toFixed(2)}`;
      case "EUR": return `€${price.toFixed(2)}`;
      case "CRC": return `₡${price.toFixed(2)}`;
      default: return `$${price.toFixed(2)}`;
    }
  }

  const total = products.reduce((acc, p) => acc + p.price * p.quantity, 0);

  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 300);
    return () => clearTimeout(timer);
  }, [total]);

  return (
    <div className={`w-full max-w-2xl p-6 rounded-xl shadow-lg ${animate ? "animate-bounce" : ""} ${products.length ? "bg-purple-600 text-white" : "bg-gray-700 text-white"}`}>
      <h2 className="text-xl font-bold">Total: {formatPrice(total)}</h2>
    </div>
  );
};

export default TotalCard;
