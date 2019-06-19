import React from 'react';
import { Route, Redirect, BrowserRouter as Router } from 'react-router-dom'
import './App.css';
import MoviesList from './moviesList/MoviesList';
import NavMenu from './nav-menu/NavigationMenu';
import MovieDetail from './moviesDetails/MoviesDetails';

class App extends React.Component {
  constructor(props) {
    super(props);    
    this.state = {
      movieDbBaseUrl: "https://api.themoviedb.org/3",
      error: null,
      isLoaded: false,
      page: 1,
      totalPages: 1,
      movies: [],
      movieGenres: []
    };
  }

  getMovies = async pageNumber => {
    // ADD THE MOVIEDB API KEY
    await fetch(`${this.state.movieDbBaseUrl}/discover/movie?api_key=${API_KEY_HERE}&language=en-US&sort_by=popularity.desc&page=${pageNumber}`, {
      method: 'GET'
    })
      .then(result => result.json())
      .then(res => {
        this.setState({
          movies: res.results,
          totalPages: res.total_pages,
          page: res.page,
          isLoaded: true
        });        
      }, (error) => {
        this.setState({
          isLoaded: false,
          error
        });
      })
  }

  getGenres = async () => {
    // ADD THE MOVIEDB API KEY
    await fetch(`${this.state.movieDbBaseUrl}/genre/movie/list?api_key=${API_KEY_HERE}&language=en-US`)
      .then(result => result.json())
      .then(res => {
        this.setState({
          movieGenres: res.genres
        });
      });
  }

  componentDidMount() {
    this.getGenres();
    this.getMovies(1);
  }

  render() {
    const { movies, movieGenres, totalPages, page, isLoaded, error } = this.state;
    return (
      <Router>
        <div className="App">
          <NavMenu />
          <div className="container mt-5">
            <Route exact path="/" render={() => (
              <Redirect to="/movies" />
            )} />
            <Route exact path="/movies" 
            render={props => 
            <MoviesList {...props} 
            getMovies={this.getMovies} 
            movies={movies} 
            totalPages={totalPages}
            page={page}
            isLoaded={isLoaded}
            error= {error} 
            genres={movieGenres} />} />
            <Route exact path="/movies/:id" component={MovieDetail} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
