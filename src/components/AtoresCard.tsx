import React from 'react'

const AtoresCard = ({ator}) => {
  return (
    <div>
        <img src={`https://image.tmdb.org/t/p/w200${ator.created_by.poster_path}`} alt="poster ator" />
        <div className="ator-info">
            <h3>{ator.created_by.name}</h3>
        </div>
    </div>
  )
}

export default AtoresCard;