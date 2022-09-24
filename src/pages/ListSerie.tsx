import { useState, useEffect } from 'react';
import SerieCard from '../components/SerieCard';

const tvUrl = import.meta.env.VITE_API_TV;
const apiKey = import.meta.env.VITE_API_KEY;

import './MoviesGrid.css';



const ListSeries = () => {
    const [topSeries, setTopSeries] = useState([]);


    const getTopPopularSeries = async (url) => {
        const res = await fetch(url);
        const data = await res.json();
        
        setTopSeries(data.results)
    };
    useEffect(() => {

        const topPopularUrl = `${tvUrl}popular?${apiKey}&language=pt-BR`;
        getTopPopularSeries(topPopularUrl);

    }, [])

    return (
        <div className='container'>
            <h2 className="title">Séries: </h2>
            <div className="movies-container">
                {topSeries.length === 0 && <p>Carregando...</p>}
                {topSeries.length > 0 && topSeries.map((serie) => <SerieCard key={serie.id} serie={serie}/>)}
            </div>
        </div>
        
    );
}
 
export default ListSeries;