import React from 'react';
import { Link } from 'react-router-dom'
import './MoviesList.css'

function MoviesList(props) {    
    var movies = props.page.movies;
    var pageNumber = props.page.pageNumber;     

    const onPageClick = page => {
        props.getMovies(page);
    }

    const createPagging = () => {
        let pageNumbers = [];        
        if(pageNumber - 1 > 0){
            pageNumbers.push(<button key="prev" className="btn btn-secondary mr-1 mb-2" onClick={() => props.getMovies(pageNumber - 1)}>&larr;</button>);
            if(pageNumber - 2 > 1){
                pageNumbers.push(<button key={1} className="btn btn-secondary mr-1 mb-2" onClick={() => onPageClick(1)}>{1}</button>);
            }            
            pageNumbers.push(<span key="extend1" className="extend">...</span>);
            if(pageNumber - 2 > 0){
                pageNumbers.push(<button key={pageNumber - 2} className="btn btn-secondary mr-1 mb-2" onClick={() => onPageClick(pageNumber - 2)}>{pageNumber - 2}</button>);
            }
            pageNumbers.push(<button key={pageNumber - 1} className="btn btn-secondary mr-1 mb-2" onClick={() => onPageClick(pageNumber - 1)}>{pageNumber - 1}</button>);            
        }
        pageNumbers.push(<button key={pageNumber} className="btn btn-secondary active mr-1 mb-2">{pageNumber}</button>);
        if(pageNumber + 1 <= props.totalPages){
            pageNumbers.push(<button key={pageNumber + 1} className="btn btn-secondary mr-1 mb-2" onClick={() => onPageClick(pageNumber + 1)}>{pageNumber + 1}</button>);
            if(pageNumber + 2 <= props.totalPages){
                pageNumbers.push(<button key={pageNumber + 2} className="btn btn-secondary mr-1 mb-2" onClick={() => onPageClick(pageNumber + 2)}>{pageNumber + 2}</button>);
            }
            pageNumbers.push(<span key="extend2" className="extend">...</span>);
            if(pageNumber + 1 != props.totalPages && pageNumber + 2 != props.totalPages){
                pageNumbers.push(<button key={props.totalPages} className="btn btn-secondary mb-2" onClick={() => props.getMovies(props.totalPages)}>{props.totalPages}</button>);
            }            
            pageNumbers.push(<button key="next" className="btn btn-secondary mb-2" onClick={() => props.getMovies(pageNumber + 1)}>&rarr;</button>)
        }  
        return pageNumbers;
    }
    
    return (
        <div className="container">            
            <div className="row">
                {movies.map(item => (
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
                                            genre.id === genreId ? <span key={genre.id}>{genre.name}</span> : null                                            
                                        )
                                    )
                                }                               
                            </div>
                        </Link>
                    </div>
                ))}
            </div >
            <div>
                {createPagging()}                
            </div>
        </div>
    );
}

export default MoviesList;