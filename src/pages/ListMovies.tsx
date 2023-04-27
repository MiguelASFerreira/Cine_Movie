import { useState, useEffect } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import { GoChevronLeft, GoChevronRight } from 'react-icons/go'

import MovieCard from '../components/MovieCard';

const moviesUrl = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

import './MoviesGrid.css';
import './ListButton.css';
import { Link } from 'react-router-dom';


const ListMovies = () => {
    const [page, setPage] = useState(1)
    const [TopMovies, setTopMovies] = useState([]);
    const [popular, setPopular] = useState([])

    const getTopPopular = async (url) => {
        const res = await fetch(url);
        const data = await res.json();
        setPopular(data.results)
    };
    useEffect(() => {

        const topPopularUrl = `${moviesUrl}popular?${apiKey}&language=pt-BR&page=${page}`;
        getTopPopular(topPopularUrl);

    }, [page])

    const getTopPopularMovies = async (url) => {
        const res = await fetch(url);
        const data = await res.json();
        
        setTopMovies(data.results)
    };
    useEffect(() => {

        const topPopularUrl = `${moviesUrl}now_playing?${apiKey}&language=pt-BR&page=${page}`;
        getTopPopularMovies(topPopularUrl);

    }, [page])

    return (
        <div className='container'>
            <h2 className="title">Filmes: </h2>
            <div className="movies-container">
                {TopMovies.length === 0 && <p>Carregando...</p>}
                {TopMovies.length > 0 && TopMovies.slice(0, 18).map((movie) => <MovieCard key={movie.id} movie={movie}/>)}
            </div>
            <div className="page">
          <button 
            className='back-to-top'
            onClick={() => {
            if (page === 1) {
              return page ;
            } else {
              setPage(page - 1)
            }
          }}>
            Prev
          </button>
          <p>{page}</p>
          <button 
            className='next-to-top'
            onClick={() => {
            if (page === 30) {
              setPage(30)
            } else {
              setPage(page + 1)
            }
          }}>
            Next
          </button>
        </div>
        </div>
    );
}
 
export default ListMovies;