import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import YouTube from 'react-youtube';

const MovieSearch = ({ title, data }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [trailerKey, setTrailerKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [videoPlayed, setVideoPlayed] = useState(false);

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
    },
  };

  const handleToggleTrailer = async (movieId) => {
    setLoading(true);
    try {
      const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`;
      const options = {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}` // Assuming this is correct
        }
      };
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Failed to fetch trailer');
      }
      const data = await response.json();
      if (data.results.length > 0) {
        const key = data.results[0].key;
        setTrailerKey(key);
        setModalIsOpen(true);
        setVideoPlayed(true); // Mark video as played
      } else {
        console.error('No trailer available');
      }
    } catch (error) {
      console.error('Fetch trailer error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    setTrailerKey('');
    setVideoPlayed(false); // Reset video played state when closing modal
  };

  return (
    <div className="text-white p-10 mb-20">
      <h1 className="uppercase text-3xl font-bold mb-4 text-left">{title}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-7 gap-4">
        {data && data.map((item) => (
          <div key={item.id} className="relative group">
            <div className="group-hover:scale-105 transition-transform duration-500 ease-in-out w-full h-full cursor-pointer"
                 onClick={() => handleToggleTrailer(item.id)}>
              <div className="group-hover:opacity-0 absolute top-0 left-0 w-full h-full bg-black/40 transition-opacity duration-300"/>
              <img src={`${import.meta.env.VITE_IMG_URL}${item.poster_path}`}
                   alt={item.title || item.original_title}
                   className="w-full h-full object-cover" loading="lazy"/>
              <div className="absolute bottom-8 left-4">
                <p className="uppercase text-md">{item.title || item.original_title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={modalIsOpen}
             onRequestClose={handleCloseModal}
             style={{
               overlay: {
                 position: "fixed",
                 zIndex: 9999,
                 top: 0,
                 left: 0,
                 right: 0,
                 bottom: 0,
                 backgroundColor: 'rgba(0, 0, 0, 0.75)'
               },
               content: {
                 position: "absolute",
                 top: "50%",
                 left: "50%",
                 right: "auto",
                 bottom: "auto",
                 marginRight: "-50%",
                 transform: "translate(-50%, -50%)",
                 border: "none",
                 background: "transparent",
                 overflow: "hidden"
               }
             }}
             contentLabel="Trailer Modal"
      >
        {trailerKey && <YouTube videoId={trailerKey} opts={opts}/>}
      </Modal>
    </div>
  );
};

MovieSearch.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array,
};

export default MovieSearch;
