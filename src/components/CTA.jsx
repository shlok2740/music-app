import React from 'react';

export default function CTA() {
  return (
    <div className="relative w-full mx-auto overflow-hidden rounded-3xl">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('music-analytics-bg.jpg?height=400&width=800')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-indigo-900/80" />
      <div className="relative z-10 px-6 py-16 text-center text-white">
        <h2 className="text-5xl font-bold mb-4">Unlock Your Music's Potential</h2>
        <p className="text-xl mb-8">
          Dive deep into your music's performance with cutting-edge analytics
        </p>
        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
          Start Free Trial
        </button>
      </div>
    </div>
  );
}
