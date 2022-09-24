import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    BsHourglassSplit,
    BsFillFileEarmarkTextFill
} from 'react-icons/bs';

import MovieCard from '../components/MovieCard';

import './Movie.css';

const img = "https://image.tmdb.org/t/p/original/";
const moviesUrl = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Movie = () => {
    const {id} = useParams();
    const [movie, setMovie] = useState(null);

    const getMovie = async (url) => {
        const res = await fetch(url);
        const data = await res.json();

        setMovie(data)
    }

    useEffect(() => {
        const movieUrl = `${moviesUrl}${id}?${apiKey}&language=pt-BR`;
        getMovie(movieUrl);
    }, [])

    function handleHours(minutes: number) {
        const hour = minutes / 60;
        let p = hour.toString().replace('.', 'h');
        let newHour = p.substr(0, 4);
        console.log(newHour);
    
        return newHour;
      }

    return (
        <div className='movie-page'>
            {movie && <>
                <MovieCard movie={movie} showLink={false} />
                <div className="bg" style={{backgroundImage: `url(${img}${movie.backdrop_path})`}}>
                </div>
                <div className="width">
                <div className="info">
                    <h3>
                        Data de Estreia: 
                    </h3>
                    <p>{movie.release_date}</p>
                </div>
                <div className="info">
                    <h3>
                        Situação: 
                    </h3>
                    {movie.status === 'Released' ? (
                        <p>Lançado</p>
                    ) : (
                        <p>Em desenvolvimento</p>
                    )}
                </div>
                <div className="info">
                    <h3>
                        Gêneros: 
                    </h3>
                    <p>{movie.genres.map(genero => {return  genero.name + ' | '})} </p>
                </div>
                <div className="info">
                    <h3>
                        Idioma | Dublado e Legendado: 
                    </h3>
                    <p>{movie.spoken_languages.map(idioma => {return  idioma.english_name + ' | '})} Portuguese </p>
                </div>
                <div className="info">
                    <h3>
                        Duração:
                    </h3>
                    <p>{handleHours(movie.runtime)}m</p>
                </div>
                <div className="info description">
                    <h3>
                        <BsFillFileEarmarkTextFill /> Descrição
                    </h3>
                    <p>{movie.overview}</p>
                </div>
                
                </div>
            </>}
        </div>
    );
}
 
export default Movie;