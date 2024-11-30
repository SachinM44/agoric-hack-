import React from 'react';

// Card component for better organization
const ProductCard = ({ image, price }) => (
  <div className="bg-white rounded-lg shadow-xl overflow-hidden">
    <img 
      src={image || "/placeholder.svg?height=200&width=300"} 
      alt="Product" 
      className="w-full h-48 object-cover"
    />
    <div className="p-4">
      <div className="flex justify-between items-center mb-2">
        <p className="text-lg font-semibold">Product Name</p>
        <p className="text-blue-600 font-bold">${price || '0.00'}</p>
      </div>
      <button 
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        onClick={() => alert('Buy functionality to be implemented')}
      >
        Buy Now
      </button>
    </div>
  </div>
);

export default function Dashboard() {
  // Mock data for 6 cards
  const products = Array(6).fill({
    image: "/placeholder.svg?height=200&width=300",
    price: "0.00"
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          Welcome to Fair Pass Dashboard
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <ProductCard 
              key={index}
              image={product.image}
              price={product.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

