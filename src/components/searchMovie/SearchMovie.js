import React from 'react';
import LoadingSpinner from '../../htmlElements/LoadingSpinner';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import { environment } from "../../environments";
import MoviesList from '../moviesList/MoviesList';
import MovieDetail from '../moviesDetails/MoviesDetails';

class SearchMovie extends React.Component {
    
    constructor(props){
        super(props);

        this.state={
            pages: [],
            isLoaded: false,
            activePage: null,      
            totalPages: 1,
            searchText: ""
        };
    }

    searchMovieApi = async (pageNumber) => {
        const { pages } = this.state;
        await fetch(`${environment.movieDbBaseUrl}/search/movie?api_key=${environment.MOVIE_DB_API_KEY}&language=en-US&page=${pageNumber}&query=${this.state.searchText}`)
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
              });
    }

    destructSearchParams = (paramsString) => {
        const params = new URLSearchParams(paramsString); 
        const querySearch = params.get('q');
        this.setState({searchText: querySearch}, () => this.searchMovieApi(1));
    }

    componentWillMount(){         
        if(this.state.searchText == ""){
            let paramsString = this.props.location.search;
            if(paramsString !== ""){
                this.destructSearchParams(paramsString);
            }
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.location != this.props.location){
            let nextParamsString = nextProps.location.search;
            let currentParamsString = this.props.location.search;
            if(nextParamsString !== "" && nextParamsString != currentParamsString){
                this.destructSearchParams(nextParamsString);
            }
        }
    }

    render(){
        const { isLoaded, activePage, totalPages } = this.state;        
        return (
            <Router>
                <Switch>
                    <Route exact path="/search/:id" component={MovieDetail} />
                    <Route exact path="/search" render={props =>
                    isLoaded && activePage !== null ?
                    <MoviesList {...props} page={activePage} totalPages={totalPages} genres={this.props.genres} getMovies={this.searchMovieApi} />
                    : <LoadingSpinner />
                    } />
                </Switch>        
            </Router>
        );
    }


}

export default SearchMovie;