import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BsFillFileEarmarkTextFill } from 'react-icons/bs';

import SerieCard from '../components/SerieCard';
import TemporadaCard from '../components/TemporadaCard';

import './Movie.css';
import AtorCard from '../components/AtoresCard';


const img = "https://image.tmdb.org/t/p/original/";
const tvUrl = import.meta.env.VITE_API_TV;
const apiKey = import.meta.env.VITE_API_KEY;
const creditsTVUrl = import.meta.env.VITE_CREDITS_TV;


const Serie = () => {
    const { id } = useParams();
    const [serie, setSerie] = useState(null);
    const [temporada, setTemporada] = useState([]);
    const [cast, setCast] = useState([]);
    const [video, setVideo] = useState([]);
    const [similar, setSimilar] = useState([]);

    const getSerie = async (url) => {
        const res = await fetch(url);
        const data = await res.json();

        setSerie(data)
    }

    useEffect(() => {
        const serieUrl = `${tvUrl}${id}?${apiKey}&language=pt-BR`;
        getSerie(serieUrl);
    }, [])

    const getCast = async (url) => {
        const res = await fetch(url);
        const data = await res.json();

        setCast(data.cast.slice(0, 8))
    }

    useEffect(() => {
        const castUrl = `${creditsTVUrl}${id}/credits?${apiKey}&language=pt-BR`;

        getCast(castUrl);
    }, [])

    const getTemporada = async (url) => {
        const res = await fetch(url);
        const data = await res.json();

        setTemporada(data.seasons)
    }

    useEffect(() => {
        const temporadaUrl = `${tvUrl}${id}?${apiKey}&language=pt-BR`;
        getTemporada(temporadaUrl);
    }, [])

    const getVideo = async (urlvideo) => {
        const res = await fetch(urlvideo);
        const data = await res.json();
        console.log(data.results)
        setVideo(data.results.slice(0, 1))
    }

    useEffect(() => {
        const videoUrl = `${tvUrl}${id}/videos?${apiKey}&language=pt-BR`;
        console.log(videoUrl)
        getVideo(videoUrl);
    }, [])

    const getSimilar = async (urlsimilar) => {
        const res = await fetch(urlsimilar);
        const data = await res.json();

        setSimilar(data.results.slice(0, 3))
    }

    useEffect(() => {
        const similarUrl = `${tvUrl}${id}/similar?${apiKey}&language=pt-BR`;
        getSimilar(similarUrl);
    }, [])

    function handleHours(minutes: number) {
        const hour = minutes / 60;
        let p = hour.toString().replace('.', 'h');
        let newHour = p.substr(0, 4);
        console.log(newHour);

        return newHour;
    }

    return (
        <div>
            <div className='movie-page'>
                {serie && <>
                    <SerieCard serie={serie} showLink={false} />
                    <div className="bg" style={{ backgroundImage: `url(${img}${serie.backdrop_path})` }}>
                    </div>
                    <div className="width">
                        <div className="info">
                            <h3>
                                Data de Lançamento:
                            </h3>
                            <p>{serie.first_air_date.substring(8, 10)}/{serie.first_air_date.substring(7, 5)}/{serie.first_air_date.substring(0, 4)}</p>
                        </div>
                        <div className="info">
                            <h3>
                                Ultima Data de atualização:
                            </h3>
                            <p>{serie.last_air_date.substring(8, 10)}/{serie.last_air_date.substring(7, 5)}/{serie.last_air_date.substring(0, 4)}</p>
                        </div>
                        <div className="info">
                            <h3>
                                Situação:
                            </h3>
                            {serie.status === 'Ended' ? (
                                <p>Finalizado</p>
                            ) : (
                                <p>Em Breve</p>
                            )}
                        </div>
                        <div className="info">
                            <h3>
                                Gêneros:
                            </h3>
                            {serie.genres && serie.genres.slice(0, 5).map((genero, i) => (
                                <span key={i} className='style_item'>{genero.name}</span>))}
                        </div>
                        <div className="info">
                            <h3>
                                Idioma | Dublado e Legendado:
                            </h3>
                            {serie.spoken_languages && serie.spoken_languages.slice(0, 3).map((idioma, d) => (
                                <span key={d} className='style_item'>{idioma.english_name + ' | '}Portuguese</span>))}
                        </div>
                        <div className="info description">
                            <h3>
                                <BsFillFileEarmarkTextFill /> Sinopse:
                            </h3>
                            <p>{serie.overview}</p>
                        </div>
                        <section className="temporadas">
                            <h2>Temporadas</h2>
                            {temporada.map((temporada) => (
                                <TemporadaCard key={temporada.id} temporada={temporada} />)
                            )}
                        </section>
                    </div>
                </>}
            </div>
            <section>
                <h3 className='text'>Elenco:</h3>
                <div className="section_header">
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

export default Serie;