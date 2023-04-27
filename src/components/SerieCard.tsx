import { Link } from 'react-router-dom';

import {FaStar} from 'react-icons/fa';

const imageUrl = import.meta.env.VITE_IMG;

const setVoteClass = (vote) => {
    if (vote >= 8) {
      return "green";
    } else if (vote >= 5) {
      return "orange";
    } else {
      return "red";
    }
  };

const SerieCard = ({serie, showLink = true}) => {
    return (
        <div className='movie-card'>
            <img loading='lazy' src={imageUrl + serie.poster_path} alt={serie.title} />
            <h2>{serie.name}</h2>
            <span className={`tag ${setVoteClass(serie.vote_average)}`}>
                <FaStar /> {serie.vote_average}
            </span>
            <p className="tagline">{serie.tagline}</p>
            {showLink && <Link to={`/serie/${serie.id}`}>Detalhes</Link>}
            
        </div>
    );
}
 
export default SerieCard;
