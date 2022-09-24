import { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import SerieCard from '../components/SerieCard';

const tvUrl = import.meta.env.VITE_API_TV;
const moviesUrl = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

import './MoviesGrid.css';



const Home = () => {
    const [TopMovies, setTopMovies] = useState([]);
    const [topTV, setTopTV] = useState([]);


    const getTopPopularMovies = async (url) => {
        const res = await fetch(url);
        const data = await res.json();
        setTopMovies(data.results)
    };
    useEffect(() => {

        const topPopularUrl = `${moviesUrl}upcoming?${apiKey}&language=pt-BR&page=1`;
        getTopPopularMovies(topPopularUrl);

    }, [])



    const getTopPopularTV = async (urlserie) => {
        const res = await fetch(urlserie);
        const data = await res.json();
        setTopTV(data.results)
    };
    useEffect(() => {

        const topPopularUrlTV = `${tvUrl}on_the_air?${apiKey}&language=pt-BR&page=1`;
        getTopPopularTV(topPopularUrlTV);

    }, [])



    return (
        <div className='container'>
            <h2 className="title">Melhores Filmes: </h2>
            <div className="movies-container">
                {TopMovies.length === 0 && <p>Carregando...</p>}
                {TopMovies.length > 0 && TopMovies.map((movie) => <MovieCard key={movie.id} movie={movie}/>)}
            </div>
            <h2 className="title">Melhores Séries: </h2>
            <div className="movies-container">
                {topTV.length === 0 && <p>Carregando...</p>}
                {topTV.length > 0 && topTV.map((serie) => <SerieCard key={serie.id} serie={serie}/>)}
            </div>
        </div>
        
    );
}
 
export default Home;