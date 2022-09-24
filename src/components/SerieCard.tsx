import { Link } from 'react-router-dom';

import {FaStar} from 'react-icons/fa';

const imageUrl = import.meta.env.VITE_IMG;

const SerieCard = ({serie, showLink = true}) => {
    return (
        <div className='movie-card'>
            <img src={imageUrl + serie.poster_path} alt={serie.title} />
            <h2>{serie.name}</h2>
            <p>
                <FaStar /> {serie.vote_average}
            </p>
            <p className="tagline">{serie.tagline}</p>
            {showLink && <Link to={`/serie/${serie.id}`}>Detalhes</Link>}
            
        </div>
    );
}
 
export default SerieCard;
