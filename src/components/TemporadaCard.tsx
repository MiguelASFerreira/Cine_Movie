import React from 'react'

import './TemporadaCard.css'

const TemporadaCard = ({temporada}) => {
  return (
    <div className='card-temporada'>
        <img loading='lazy' className='temporada-img' src={`https://image.tmdb.org/t/p/w200${temporada.poster_path}`} alt="poster temporada" />
        <div className="temporada-info">
            <h3>{temporada.name}</h3>
            <p className='qtde-eps'>{temporada.episode_count} episodio(s)</p>
            <p>{temporada.overview}</p>
        </div>
    </div>
  )
}

export default TemporadaCard;