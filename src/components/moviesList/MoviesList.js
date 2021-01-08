import React from 'react';
import MovieItem from './MovieItem';

import './MoviesList.css'

const MoviesList = (props) => {
    const { movies, pageNumber } = props.page || { movies: [], pageNumber: undefined };
    const { totalPages, getMovies } = props;

    React.useEffect(() => {
        const params = new URLSearchParams(props.location.search);
        const queryPageNumber = parseInt(params.get('page'));
        if (!queryPageNumber) {
            params.append("page", 1);
            props.history.push({ ...props.history.location, search: `?${params.toString()}` });
        } else if (pageNumber !== queryPageNumber) {
            props.getMovies(queryPageNumber);
        }
    }, [props.history.location.search]);

    const onPageClick = page => () => props.history.replace({
        ...props.history.location,
        search: `?page=${page}`
    });

    const getPreviousBtn = () => (
        <button key="prev" className="btn btn-secondary mr-1 mb-2" onClick={() => getMovies(pageNumber - 1)}>&larr;</button>
    );

    const getNextBtn = () => (
        <button key="next" className="btn btn-secondary mb-2" onClick={() => getMovies(pageNumber + 1)}>&rarr;</button>
    );

    const getPaginationBtn = (index) => (
        <button
            key={index}
            onClick={index !== pageNumber ? onPageClick(index) : undefined}
            className={`btn btn-secondary ${index === pageNumber ? 'active' : ''} mr-1 mb-2`}>
            {index}
        </button>
    );

    const getPunctuationElem = (index) => (
        <span key={`punk-${index}`} className="extend">...</span>
    );

    const createPagination = () => {
        let pageNumbers = [getPaginationBtn(pageNumber)];
        let count = 0;

        for (let i = pageNumber - 1, j = pageNumber + 1; count <= 1; i--, j++) {
            if (i > 0) {
                pageNumbers = [getPaginationBtn(i), ...pageNumbers];
            }
            if (j <= totalPages) {
                pageNumbers.push(getPaginationBtn(j));
            }
            count++;
        }

        if (pageNumber > 3) {
            pageNumbers = [getPreviousBtn(), getPaginationBtn(1), getPunctuationElem(1), ...pageNumbers];
        } else if (pageNumber > 1) {
            pageNumbers.unshift(getPreviousBtn());
        }
        if (pageNumber < totalPages - 2) {
            pageNumbers = [...pageNumbers, getPunctuationElem(2), getPaginationBtn(totalPages), getNextBtn()];
        } else if (pageNumber < totalPages) {
            pageNumbers.push(getNextBtn());
        }

        return pageNumbers;
    }

    return movies && movies.length ? (
        <div className="container">
            <div className="row">
                {movies.map(item =>
                    <MovieItem
                        key={item.id}
                        movie={item}
                        genres={props.genres} />
                )}
            </div>
            <div>
                {createPagination()}
            </div>
        </div>
    ) : null;
}

export default MoviesList;