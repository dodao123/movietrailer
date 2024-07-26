import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Header({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchButtonClick = () => {
    if (searchTerm) {
      onSearch(searchTerm);
    }
  };

  return (
    <div className='bg-black p-4 md:p-6 flex flex-col md:flex-row items-center justify-between'>
      <div className='flex items-center space-x-2 md:space-x-4'>
        <h1 className='text-xl md:text-2xl lg:text-5xl text-red-700 font-bold uppercase'>Movie</h1>
        <nav className='hidden md:flex items-center space-x-4'>
          <a href='#' className='text-white hover:text-yellow-300 transition duration-300'>Home</a>
          <a href='#' className='text-white hover:text-yellow-300 transition duration-300'>About</a>
          <a href='#' className='text-white hover:text-yellow-300 transition duration-300'>Contact</a>
        </nav>
      </div>
      
      <div className='flex items-center space-x-2 md:space-x-4 mt-2 md:mt-0'>
        <input
          type='text'
          placeholder='Search film'
          className='p-2 md:p-4 text-black rounded-lg text-sm md:text-base lg:text-lg'
          value={searchTerm}
          onChange={handleSearchInputChange}
        />
        <button
          className='rounded-lg p-2 md:p-4 text-white bg-red-600 hover:bg-yellow-500 transition duration-500 text-sm md:text-base lg:text-lg'
          onClick={handleSearchButtonClick}
        >
          Search
        </button>
      </div>
    </div>
  );
}

Header.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Header;
