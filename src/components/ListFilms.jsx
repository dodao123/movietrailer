import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Modal from 'react-modal';
import YouTube from 'react-youtube';



const opts = {
  height: '390',
  width: '640',
  playerVars: {
    autoplay: 1,
  },
};

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 10
  },
  desktop: {
    breakpoint: { max: 3000, min: 1200 },
    items: 7
  },
  tablet: {
    breakpoint: { max: 1200, min: 600 },
    items: 3
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 2
  }
};

const ListFilms = ({ title, data }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [trailerKey, setTrailerKey] = useState("");

  const handleTrailer = async (id) => {
    try {
      const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=vi`;
      const options = {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}` // Ensure your API key is correctly used here
        }
      };

      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Failed to fetch trailer key');
      }
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        setTrailerKey(data.results[0].key);
        setModalIsOpen(true);
      } else {
        console.error('No trailer available');
      }
    } catch (error) {
      console.error('Fetch trailer error:', error);
      setModalIsOpen(false);
    }
  };

  return (
    <div className='text-white p-10 mb-20 '>
      <h1 className='uppercase text-3xl font-bold mb-4 text-left mt-[130px]'>{title}</h1>

      <Carousel responsive={responsive} className='mt-5'>
        {data && data.length > 0 &&
          data.map((item) => (
            <div key={item.id} className='relative group' onClick={() => handleTrailer(item.id)}>
              <div className='group-hover:scale-105 transition-transform duration-500 ease-in-out w-full h-full cursor-pointer'>
                <div className='absolute top-0 left-0 w-full h-full bg-black opacity-40'></div>
                <img
                  src={`${import.meta.env.VITE_IMG_URL}${item.poster_path}`}
                  alt={item.title || item.original_title}
                  className='w-full h-full object-cover'
                />
                <div className='absolute bottom-8 left-4'>
                  <p className='uppercase text-md'>{item.title || item.original_title}</p>
                </div>
              </div>
            </div>
          ))}
      </Carousel>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          overlay: {
            position: "fixed",
            zIndex: 9999,
          },
          content: {
              top:"50%",
              left:"50%",
              right:"auto",
              bottom:"auto",
              marginRight: "-50%",
              transform: "translate(-50%,-50%)",
          }
        }}
        contentLabel="Trailer Modal"
      >
        {trailerKey && <YouTube videoId={trailerKey} opts={opts} />}
      </Modal>

    </div>
  );
};

ListFilms.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array.isRequired,
};

export default ListFilms;
