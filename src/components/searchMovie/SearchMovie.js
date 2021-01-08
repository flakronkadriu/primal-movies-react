import React from 'react';
import LoadingSpinner from '../../htmlElements/LoadingSpinner';
import { Route, Switch, Redirect } from 'react-router-dom'
import MoviesList from '../moviesList/MoviesList';
import MovieDetails from '../moviesDetails/MoviesDetails';
import * as MovieDbApi from '../../services/api-calls';

const SearchMovie = (props) => {
    const [searchMovieState, setSearchMovieState] = React.useState({});

    React.useEffect(() => {
        let paramsString = props.location.search;
        if (paramsString !== "") {
            destructSearchParams(paramsString);
        }
    }, [props.location]);

    const destructSearchParams = (paramsString) => {
        const params = new URLSearchParams(paramsString);
        const querySearch = params.get('q');
        setSearchMovieState({ searchValue: querySearch });
        searchMovieApi(querySearch, 1);
    }

    const searchMovieApi = async (query, pageNumber) => {
        try {
            const data = await MovieDbApi.searchMovie(query, pageNumber);
            let page = {
                pageNumber: data.page,
                movies: data.results
            };
            setSearchMovieState({
                ...searchMovieState,
                totalPages: data.total_pages,
                isLoaded: true,
                pages: [...(searchMovieState.pages || []), page],
                activePage: page
            });
        } catch (error) {
            setSearchMovieState({
                ...searchMovieState,
                isLoaded: false,
                error
            });
        }
    }


    const renderSearchResult = (renderProps) => {
        const { isLoaded, activePage, totalPages } = searchMovieState;
        if (isLoaded && activePage) {
            if (!activePage.movies.length) {
                return <h1 style={{ color: "#ffffff" }}>No results</h1>
            }
            return (
                <MoviesList
                    {...renderProps}
                    page={activePage}
                    totalPages={totalPages}
                    genres={props.genres}
                    getMovies={searchMovieApi} />
            );
        }

        return <LoadingSpinner />;
    }

    return (
        <>
            {searchMovieState.error && <Redirect to="/error-404" />}
            <Switch>
                <Route exact path="/search/:id" component={MovieDetails} />
                <Route exact path="/search" render={renderSearchResult} />
            </Switch>
        </>
    );


}

export default SearchMovie;