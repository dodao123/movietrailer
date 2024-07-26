import React , { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Banner from './components/Banner';
import ListFilms from './components/ListFilms';
import MovieSearch from './components/MovieSearch';

function App() {
  const [movies, setMovies] = useState([]);
  const [movieRate, setMovieRate] = useState([]);
  const [movieUp, setMovieUp] = useState([]);
  const [movieCome, setMovieCome] = useState([]);
  const [movieSearch, setMovieSearch] = useState([]);

  const ClickSearch = async (searchVal) => {
    setMovieSearch([]);
    try {
      const url = `https://api.themoviedb.org/3/search/movie?query=${searchVal}&include_adult=false&language=vi&page=1`;
      const options = {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}` // Assuming this is correct
        }
      };
      const searchMovie = await fetch(url, options);
      if (!searchMovie.ok) {
        throw new Error('Failed to fetch search results');
      }
      const data = await searchMovie.json();
      setMovieSearch(data.results); // Update state with search results
    } catch (error) {
      console.error('Search movies error:', error);
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const urls = [
          'https://api.themoviedb.org/3/movie/popular?language=vi&page=1',
          'https://api.themoviedb.org/3/movie/top_rated?language=vi&page=1',
          'https://api.themoviedb.org/3/movie/upcoming?language=vi&page=1',
          'https://api.themoviedb.org/3/movie/now_playing?language=vi&page=1'
        ];

        const options = {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}` // Assuming this is correct
          }
        };

        const requests = urls.map(url => fetch(url, options));

        const responses = await Promise.all(requests);
        const dataPromises = responses.map(response => response.json());

        const [data1, data2, data3, data4] = await Promise.all(dataPromises);

        setMovies(data1.results);
        setMovieRate(data2.results);
        setMovieUp(data3.results);
        setMovieCome(data4.results);
      } catch (error) {
        console.error('Fetch movies error:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className='bg-black pb-10'>
      <Header onSearch={ClickSearch} />
      <div className="banner-container">
        <Banner />
      </div>
  
      <div className="movie-list-container">
        {movieSearch.length > 0 ? (
          <MovieSearch title={'Kết Quả Tìm Kiếm'} data={movieSearch} />
        ) : (
          <>
            <ListFilms title={'Phim Hot'} data={movies} />
            <ListFilms title={'Phim Đề Cử'} data={movieRate} />
            <ListFilms title={'Phim mới nổi'} data={movieUp} />
            <ListFilms title={'Phim Đang chiếu'} data={movieCome} />
          </>
        )}
      </div>
    </div>
  );
  
}

export default App;
