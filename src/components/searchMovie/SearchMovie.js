import React from 'react';
import LoadingSpinner from '../../htmlElements/LoadingSpinner';
import { environment } from "../../environments";
import MoviesList from '../moviesList/MoviesList';

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
            let paramsString = nextProps.location.search;
            if(paramsString !== ""){
                this.destructSearchParams(paramsString);
            }
        }
    }

    render(){
        const { isLoaded, activePage, totalPages } = this.state;
        if(!isLoaded && activePage == null){
            return <LoadingSpinner />;
        }
        return <MoviesList page={activePage} totalPages={totalPages} genres={this.props.genres} getMovies={this.searchMovieApi} />;
    }


}

export default SearchMovie;