import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BsFillFileEarmarkTextFill } from 'react-icons/bs';

import MovieCard from '../components/MovieCard';
import AtorCard from '../components/AtoresCard';

import './Movie.css';
import './MoviesGrid.css'


const img = "https://image.tmdb.org/t/p/original/";
const moviesUrl = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;
const creditsUrl = import.meta.env.VITE_CREDITS;

const Movie = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);
    const [video, setVideo] = useState([]);
    const [similar, setSimilar] = useState([]);

    const getMovie = async (url) => {
        const res = await fetch(url);
        const data = await res.json();
        console.log(data)

        setMovie(data)
    }

    useEffect(() => {
        const movieUrl = `${moviesUrl}${id}?${apiKey}&language=pt-BR`;
        getMovie(movieUrl);
    }, [])

    const getCast = async (url) => {
        const res = await fetch(url);
        const data = await res.json();

        setCast(data.cast.slice(0, 8))
    }

    useEffect(() => {
        const castUrl = `${creditsUrl}${id}/credits?${apiKey}&language=pt-BR`;

        getCast(castUrl);
    }, [])

    const getVideo = async (urlvideo) => {
        const res = await fetch(urlvideo);
        const data = await res.json();

        setVideo(data.results.slice(0, 1))
    }

    useEffect(() => {
        const videoUrl = `${moviesUrl}${id}/videos?${apiKey}&language=pt-BR`;
        getVideo(videoUrl);
    }, [])

    const getSimilar = async (urlsimilar) => {
        const res = await fetch(urlsimilar);
        const data = await res.json();
        console.log(data.results)
        setSimilar(data.results.slice(0, 10))
    }

    useEffect(() => {
        const similarUrl = `${moviesUrl}${id}/similar?${apiKey}&language=pt-BR`;
        getSimilar(similarUrl);
    }, [])

    function handleHours(minutes: number) {
        const hour = minutes / 60;
        let p = hour.toString().replace('.', 'h');
        let newHour = p.substr(0, 4);

        return newHour;
    }

    return (
        <div>
            <div className='movie-page'>
                {movie && <>
                    <MovieCard movie={movie} showLink={false} />
                    <div className="bg" style={{ backgroundImage: `url(${img}${movie.backdrop_path || movie.poster_path})` }}>
                    </div>
                    <div className="width">
                        <div className="info">
                            <h3>
                                Data de Estreia:
                            </h3>
                            <p>{movie.release_date.substring(8, 10)}/{movie.release_date.substring(7, 5)}/{movie.release_date.substring(0, 4)}</p>
                        </div>
                        <div className="info">
                            <h3>
                                Situação:
                            </h3>
                            {movie.status === 'Released' ? (
                                <p>Lançado</p>
                            ) : (
                                <p>Em Breve</p>
                            )}
                        </div>
                        <div className="info ">
                            <h3>
                                Gêneros:
                            </h3>
                            {movie.genres && movie.genres.slice(0, 5).map((genero, i) => (
                                <span key={i} className='style_item'>{genero.name}</span>))}

                        </div>
                        <div className="info idioma">
                            <h3>
                                Idioma | Dublado e Legendado:
                            </h3>
                            {movie.spoken_languages && movie.spoken_languages.slice(0, 6).map((idioma, d) => (
                                <span key={d} className='style_item'>{idioma.english_name + ' | '}Portuguese</span>))}

                        </div>
                        <div className="info">
                            <h3>
                                Duração:
                            </h3>
                            <span className='style_item'>{handleHours(movie.runtime)}m</span>
                        </div>
                        <div className="info description">
                            <h3>
                                <BsFillFileEarmarkTextFill /> Sinopse:
                            </h3>
                            <p>{movie.overview}</p>
                        </div>
                    </div>
                </>}
            </div>
            <section >
                <h3 className='text'>Elenco</h3>
                <div className=" section_header">
                    {cast.map((ator) => <AtorCard key={ator.id} ator={ator} />)}
                </div>
            </section>
            <section className="video">
                <div className="video_item">
                    {video.map((video) =>
                        <iframe key={video.id} id="player" type="text/html"
                            src={`http://www.youtube.com/embed/${video.key}?enablejsapi=1&origin=http://example.com`}>
                        </iframe>)}
                </div>
            </section>

        </div>
    );
}

export default Movie;