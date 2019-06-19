import React from 'react';
import { Link } from 'react-router-dom'
import './MoviesList.css'

function MoviesList(props) {

    const onNextPageClick = () => {
        if (props.page <= props.totalPages && props.totalPages > 1) {
            props.getMovies(props.page + 1);
        }
    }

    const onPrevPageClick = () => {
        if (props.page > 1) {
            props.getMovies(props.page - 1);
        }
    }
    if (props.error) {
        return <div>Error: {props.error.message}</div>;
    } else if (!props.isLoaded) {
        return <div className="col-md-12 text-center"><i className="fa fa-spinner fa-spin fa-5x"></i></div>;
    } else {
        return (
            <div className="container">                
                <button className="btn btn-secondary mr-1 mb-2" style={{ visibility: props.page > 1 ? 'visible' : 'hidden' }} onClick={onPrevPageClick}>Previous</button>
                <button className="btn btn-secondary mb-2" style={{ visibility: props.page <= props.totalPages && props.totalPages > 1 ? 'visible' : 'hidden' }} onClick={onNextPageClick}>Next</button>
                <div className="row">
                    {props.movies.map(item => (
                        <div key={item.id} className="col-md-3 portfolio-item">
                            <Link to={"/movies/" + item.id}>
                                <img className="img-responsive" src={"http://image.tmdb.org/t/p/w300/" + item.poster_path} alt="" />
                                <div className="title">
                                    {item.title}
                                </div>
                                <div className="overview">{item.overview}</div>
                                <div className="genres">
                                    {
                                        item.genre_ids.map(genreId =>
                                            props.genres.map(genre =>
                                                <RenderGenre key={genre.id} genreId={genreId} genre={genre} />
                                            )

                                        )}
                                </div>
                            </Link>
                        </div>
                    ))}
                </div >
            </div >
        );
    }
}

function RenderGenre(props) {
    if (props.genreId == props.genre.id) {
        return <span>{props.genre.name}</span>
    }
    return null;
}

export default MoviesList;