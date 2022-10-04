import { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import SerieCard from '../components/SerieCard';

const tvUrl = import.meta.env.VITE_API_TV;
const moviesUrl = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

import './MoviesGrid.css';



const Home = () => {
    const [viewmovies, setViewMovies] = useState([]);
    const [viewTV, setViewTV] = useState([]);


    const getViewMovies = async (url) => {
        const res = await fetch(url);
        const data = await res.json();
        setViewMovies(data.results)
    };
    useEffect(() => {

        const topPopularUrl = `${moviesUrl}upcoming?${apiKey}&language=pt-BR&page=1`;
        getViewMovies(topPopularUrl);

    }, [])



    const getViewTV = async (urlserie) => {
        const res = await fetch(urlserie);
        const data = await res.json();
        setViewTV(data.results)
    };
    useEffect(() => {

        const topPopularUrlTV = `${tvUrl}on_the_air?${apiKey}&language=pt-BR&page=1`;
        getViewTV(topPopularUrlTV);

    }, [])



    return (
        <div className='container'>
            <h2 className="title">Melhores Filmes: </h2>
            <div className="movies-container">
                {viewmovies.length === 0 && <p>Carregando...</p>}
                {viewmovies.length > 0 && viewmovies.slice(0, 18).map((movie) => <MovieCard key={movie.id} movie={movie}/>)}
            </div>
            <h2 className="title">Melhores Séries: </h2>
            <div className="movies-container">
                {viewTV.length === 0 && <p>Carregando...</p>}
                {viewTV.length > 0 && viewTV.slice(0, 18).map((serie) => <SerieCard key={serie.id} serie={serie}/>)}
            </div>
        </div>
        
    );
}
 
export default Home;