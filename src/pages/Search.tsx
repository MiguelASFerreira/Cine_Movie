import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import MovieCard from '../components/MovieCard';
import SerieCard from '../components/SerieCard';

const searchMoviesURL = import.meta.env.VITE_SEARCH;
const searchSeriesURL = import.meta.env.VITE_SEARCH_TV;
const apiKey = import.meta.env.VITE_API_KEY;

import './MoviesGrid.css';

const Search = () => {
    const [searchParams] = useSearchParams();

    const [movies, setMovies] = useState([]);
    const [series, setSeries] = useState([]);

    const query = searchParams.get("q");

    const getSearchMovies = async (url) => {
        const res = await fetch(url);
        const data = await res.json();

        setMovies(data.results)
    };
    useEffect(() => {
        const searchWithQueryURL = `${searchMoviesURL}?${apiKey}&query=${query}&language=pt-BR`;

        getSearchMovies(searchWithQueryURL);

    }, [query])


    const getSearchSeries = async (urlserie) => {
        const res = await fetch(urlserie);
        const data = await res.json();

        setSeries(data.results)
    };
    useEffect(() => {
        const searcSeriehWithQueryURL = `${searchSeriesURL}?${apiKey}&query=${query}&language=pt-BR`;

        getSearchSeries(searcSeriehWithQueryURL);

    }, [query])

    return (
        <div className='container'>
            <h2 className="title">
                Resultados para: <span className="query-text">{query}</span>
            </h2>
            <div className="movies-container">
                {movies.length === 0 && <p>Não encontrado</p>}
                {movies.length > 0 && movies.map((movie) => <MovieCard key={movie.id} movie={movie}/>)}
                {series.length === 0 && <p>Não encontrado</p>}
                {series.length > 0 && series.map((serie) => <SerieCard key={serie.id} serie={serie}/>)}
            </div>
        </div>
    )
}
 
export default Search;