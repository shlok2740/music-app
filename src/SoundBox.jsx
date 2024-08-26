import React from 'react';

const SoundBox = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-6 shadow-lg">
        <h1 className="text-2xl font-bold mb-8">SOUNDBOX</h1>
        <nav>
          <ul className="space-y-4">
            {['Dashboard', 'Overview', 'Radio', 'My music', 'Discussion', 'Favorites', 'Help'].map((item) => (
              <li key={item} className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 cursor-pointer">
                <span>{/* Icon placeholder */}</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto pt-6">
          <label className="flex items-center cursor-pointer">
            <span className="mr-2 text-sm">Dark</span>
            <div className="relative">
              <input type="checkbox" className="sr-only" />
              <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
              <div className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
            </div>
          </label>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold">Hi, Fancy!</h2>
          <div className="flex items-center space-x-4">
            <input type="text" placeholder="Search" className="px-4 py-2 rounded-full bg-white shadow" />
            <img src="avatar-placeholder.jpg" alt="User" className="w-10 h-10 rounded-full" />
          </div>
        </header>

        {/* Subscription banner */}
        <div className="bg-blue-100 p-6 rounded-lg mb-8 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold mb-2">Discounted Annual Subscription</h3>
            <p className="text-sm text-gray-600">Subscribe for a year with a discount</p>
          </div>
          <button className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600">Subscribe</button>
        </div>

        {/* Statistics and Playlists */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Statistics</h3>
            {/* Placeholder for charts */}
            <div className="h-40 bg-gray-200 rounded"></div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Playlists</h3>
            {/* Playlist items */}
            <div className="grid grid-cols-3 gap-4">
              {['New Playlist', 'Eminem Essentials', 'My Shazam Tracks'].map((playlist) => (
                <div key={playlist} className="bg-gray-200 h-24 rounded flex items-center justify-center text-sm">
                  {playlist}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Popular Categories and Suggestions */}
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Categories</h3>
            <div className="grid grid-cols-3 gap-4">
              {['90s', 'Hip-hop/Rap', 'African'].map((category) => (
                <div key={category} className="bg-gray-200 h-24 rounded flex items-center justify-center">
                  {category}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Suggestions for you</h3>
            <ul className="space-y-2">
              {['Rema - FYN', 'Heat Waves - Glass Animal', 'Under The Influence - Chris Brown'].map((track) => (
                <li key={track} className="flex items-center justify-between bg-white p-2 rounded">
                  <span>{track}</span>
                  <button className="text-blue-500">Play</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SoundBox;