import React from 'react';
import { Link, withRouter } from 'react-router-dom'

const MovieItem = (props) => {
    const { movie } = props;

    const getGenres = (movieItem) => {
        const selectedMovieGenre = movieItem.genre_ids.map(genreId => props.genres.find(f => f.id === genreId)).filter(Boolean);

        return selectedMovieGenre.map((movieGenre) => (
            <span key={`${movieItem.id}-genre-${movieGenre.id}`}>{movieGenre.name}</span>
        ));
    };

    return (
        <div key={movie.id} className="col-md-3 portfolio-item">
            <Link to={`${props.location.pathname}/${movie.id}`}>
                <img className="img-responsive" src={`http://image.tmdb.org/t/p/w300/${movie.poster_path}`} alt="movie-poster" />
                <div className="title">
                    {movie.title}
                </div>
                <div className="overview">{movie.overview}</div>
                {movie.genre_ids.length && <div className="genres">{getGenres(movie)}</div>}
            </Link>
        </div>
    );
};

export default withRouter(MovieItem);