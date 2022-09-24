import { useState, useEffect } from 'react';

import { GoChevronLeft, GoChevronRight } from 'react-icons/go'

import MovieCard from '../components/MovieCard';

const moviesUrl = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

import './MoviesGrid.css';
import './ListButton.css'

const ListMovies = () => {
    const [TopMovies, setTopMovies] = useState([]);
    


    const getTopPopularMovies = async (url) => {
        const res = await fetch(url);
        const data = await res.json();
        
        setTopMovies(data.results)
    };
    useEffect(() => {

        const topPopularUrl = `${moviesUrl}popular?${apiKey}&language=pt-BR&page=1`;
        getTopPopularMovies(topPopularUrl);

    }, [])

    return (
        <div className='container'>
            <h2 className="title">Filmes: </h2>
            <div className="movies-container">
                {TopMovies.length === 0 && <p>Carregando...</p>}
                {TopMovies.length > 0 && TopMovies.map((movie) => <MovieCard key={movie.id} movie={movie}/>)}
            </div>
            <div id="setas">
                <button id='botaoLeft' className='botao'>
                    <GoChevronLeft />
                </button>
                <button id='botaoRight' className='botao'>
                    <GoChevronRight />
                </button>
                
            </div>
        </div>
        
    );
}
 
export default ListMovies;