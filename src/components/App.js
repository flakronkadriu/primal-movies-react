import React from 'react';
import { Route, Redirect, Switch, BrowserRouter as Router } from 'react-router-dom'
import './App.css';
import MoviesList from './moviesList/MoviesList';
import NavMenu from './nav-menu/NavigationMenu';
import MovieDetail from './moviesDetails/MoviesDetails';
import { environment } from "../environments";
import LoadingSpinner from "../htmlElements/LoadingSpinner";
import SearchMovie from './searchMovie/SearchMovie';

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

  getMoviesApi = async pageNumber => {
    // ADD THE MOVIEDB API KEY  
    const { pages } = this.state; 
    await fetch(`${environment.movieDbBaseUrl}/discover/movie?api_key=${environment.MOVIE_DB_API_KEY}&language=en-US&sort_by=popularity.desc&page=${pageNumber}`, {
      method: 'GET'
    })
      .then(result => result.json())
      .then(res => {     
        let page  = {
          pageNumber: res.page,
          movies: res.results
        };
        pages.push(page);
        this.setState({          
          totalPages: res.total_pages,          
          isLoaded: true,
          pages,
          activePage: page
        });        
      }, (error) => {
        this.setState({
          isLoaded: false,
          error
        });
      })
  }

  getMovies = pageNumber => {
    const { totalPages, pages } = this.state;
    if((pageNumber < 1 || pageNumber > totalPages) && totalPages < 1){
      return;
    }
    const searchResult = pages.find(f => f.pageNumber == pageNumber);
    if(searchResult != undefined){
      this.setState({activePage: searchResult});
    }else{
      this.setState({isLoaded: false});
      this.getMoviesApi(pageNumber);
    }
  }

  getGenres = async () => {
    // ADD THE MOVIEDB API KEY
    await fetch(`${environment.movieDbBaseUrl}/genre/movie/list?api_key=${environment.MOVIE_DB_API_KEY}&language=en-US`)
      .then(result => result.json())
      .then(res => {
        this.setState({
          movieGenres: res.genres
        });
      });
  }

  componentWillMount(){
    if(this.state.movieGenres.length == 0){
      this.getGenres();
      this.getMovies(1);
    }
  }

  render() {
    const { activePage, movieGenres, totalPages, isLoaded } = this.state;
    return (
      <Router>
        <div className="App">
          <NavMenu />
          <div className="container mt-5">
            <Switch>
              <Route exact path="/">
                <Redirect to="/movies" />
              </Route>
              <Route exact path="/movies">
                { isLoaded && activePage !== null ? <MoviesList page={activePage} totalPages={totalPages} genres={movieGenres} getMovies={this.getMovies} /> : <LoadingSpinner /> }              
              </Route>
              <Route exact path="/movies/:id" component={MovieDetail} />
              <Route exact path="/search" render={props => <SearchMovie {...props} genres={movieGenres} />} />
            </Switch>            
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
