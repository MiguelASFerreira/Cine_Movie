import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    BsFillFileEarmarkTextFill
} from 'react-icons/bs';

import SerieCard from '../components/SerieCard';

import './Movie.css';
import TemporadaCard from '../components/TemporadaCard';
import AtoresCard from '../components/AtoresCard';

const img = "https://image.tmdb.org/t/p/original/";
const tvUrl = import.meta.env.VITE_API_TV;
const apiKey = import.meta.env.VITE_API_KEY;

const Serie = () => {
    const {id} = useParams();
    const [serie, setSerie] = useState(null);
    const [temporada, setTemporada] = useState([])

    const getSerie = async (url) => {
        const res = await fetch(url);
        const data = await res.json();

        setSerie(data)
    }

    useEffect(() => {
        const serieUrl = `${tvUrl}${id}?${apiKey}&language=pt-BR`;
        getSerie(serieUrl);
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

    function handleHours(minutes: number) {
        const hour = minutes / 60;
        let p = hour.toString().replace('.', 'h');
        let newHour = p.substr(0, 4);
        console.log(newHour);
    
        return newHour;
      }

    return (
        <div className='movie-page'>
            {serie && <>
                <SerieCard serie={serie} showLink={false} />
                <div className="bg" style={{backgroundImage: `url(${img}${serie.backdrop_path})`}}>
                </div>
                <div className="width">
                <div className="info">
                    <h3>
                        Data de Estreia: 
                    </h3>
                    <p>{serie.first_air_date}</p>
                </div>
                <div className="info">
                    <h3>
                        Ultima Data de atualização: 
                    </h3>
                    <p>{serie.last_air_date}</p>
                </div>
                <div className="info">
                    <h3>
                        Situação: 
                    </h3>
                    {serie.status === 'Ended' ? (
                        <p>Finalizado</p>
                    ) : (
                        <p>Em desenvolvimento</p>
                    )}
                </div>
                <div className="info">
                    <h3>
                        Atores: 
                    </h3>
                    <p>{serie.created_by.map(ator => {return  ator.name + ' | '})} </p>
                </div>
                <div className="info">
                    <h3>
                        Gêneros: 
                    </h3>
                    <p>{serie.genres.map(genero => {return  genero.name + ' | '})} </p>
                </div>
                <div className="info">
                    <h3>
                        Idioma | Dublado e Legendado: 
                    </h3>
                    <p>{serie.spoken_languages.map(idioma => {return  idioma.english_name + ' | '})} Portuguese </p>
                </div>
                <div className="info description">
                    <h3>
                        <BsFillFileEarmarkTextFill /> Descrição
                    </h3>
                    <p>{serie.overview}</p>
                </div>
                <section className="temporadas">
                    <h2>Temporadas</h2>
                    {temporada.map((temporada) => (
                        <TemporadaCard key={temporada.id} temporada={temporada}/>)
                    )}  
                </section>
                
                </div>
            </>}
        </div>
    );
}
 
export default Serie;