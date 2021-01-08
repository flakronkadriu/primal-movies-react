import React from 'react';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom'
import MoviesList from './moviesList/MoviesList';
import NavMenu from './nav-menu/NavigationMenu';
import MovieDetails from './moviesDetails/MoviesDetails';
import LoadingSpinner from "../htmlElements/LoadingSpinner";
import SearchMovie from './searchMovie/SearchMovie';
import PageNotFound from './pageNotFound/PageNotFound';
import * as MovieDbApi from '../services/api-calls';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      pages: [],
      activePage: null,
      totalPages: 1,
      movieGenres: [],
    };
  }

  componentDidMount() {
    this.getGenres();
  }

  componentWillReceiveProps() {
    const { history } = this.props;

    if (history.location.pathname !== "/error-404" && this.state.error) {
      this.setState({ error: undefined, isLoaded: true });
    }
  }

  render() {
    const { activePage, movieGenres, totalPages, isLoaded, error } = this.state;
    return (
      <div className="App">
        <NavMenu getMovies={this.getMovies} />
        <div className="container mt-5">
          {error && <Redirect to="error-404" />}
          <Switch>
            <Route exact path="/">
              <Redirect to="/movies?page=1" />
            </Route>
            <Route exact path="/error-404" component={PageNotFound} />
            <Route exact path="/movies/:id" component={MovieDetails} />
            <Route exact path="/movies" render={props =>
              isLoaded ?
                <MoviesList {...props}
                  page={activePage}
                  totalPages={totalPages}
                  genres={movieGenres}
                  getMovies={this.getMovies} />
                : <LoadingSpinner />
            } />
            <Route path="/search" render={props => <SearchMovie {...props} genres={movieGenres} />} />
          </Switch>
        </div>
      </div>
    );
  }

  getMovies = pageNumber => {
    const { totalPages, pages } = this.state;
    if ((pageNumber < 1 || pageNumber > totalPages) && totalPages < 1) {
      return;
    }
    const searchResult = pages.find(f => f.pageNumber === pageNumber);
    if (searchResult !== undefined) {
      this.setState({ activePage: searchResult });
    } else {
      this.setState({ isLoaded: false });
      this.fetchMovies(pageNumber);
    }
  }

  async fetchMovies(pageNumber) {
    try {
      const data = await MovieDbApi.discoverMovies(pageNumber);
      let page = {
        pageNumber: data.page,
        movies: data.results
      };
      this.setState({
        totalPages: data.total_pages,
        isLoaded: true,
        pages: [...this.state.pages, page],
        activePage: page
      });
    } catch (error) {
      this.setState({
        isLoaded: false,
        error
      });
    }
  }

  getGenres = async () => {
    // ADD THE MOVIEDB API KEY
    try {
      const data = await MovieDbApi.getGenres();
      this.setState({
        movieGenres: data.genres,
        isLoaded: true
      });
    } catch (error) {
      this.setState({
        isLoaded: false,
        error
      });
    }
  }
}

export default withRouter(App);
