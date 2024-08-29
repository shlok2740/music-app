import React from 'react';

export default function CTA() {
  return (
    <div className="relative w-full mx-auto overflow-hidden rounded-3xl">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('vite.svg?height=400&width=800')",
        }}
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 px-6 py-16 text-center text-white">
        <h2 className="text-4xl font-bold mb-4">Subscribe</h2>
        <p className="text-lg mb-8">
          Join our community of subscribers and receive regular updates
        </p>
      </div>
    </div>
  );
}
