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
  

const MovieCard = ({movie, showLink = true}) => {
    return (
        <div className='movie-card'>
            <img src={imageUrl + movie.poster_path || movie.backdrop_path} alt={movie.title} />
            <h2>{movie.name ||movie.title }</h2>
            <span className={`tag ${setVoteClass(movie.vote_average)}`}>
                <FaStar /> {movie.vote_average}
            </span>
            <p className="tagline">{movie.tagline}</p>
            {showLink && <Link to={`/movie/${movie.id}`}>Detalhes</Link>}
        </div>
    );
}
 
export default MovieCard;
