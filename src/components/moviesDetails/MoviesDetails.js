import React from 'react';
import './MoviesDetails.css';
import { environment } from "../../environments";
import LoadingSpinner from "../../htmlElements/LoadingSpinner";

class MovieDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            item: null,
            movieGenres: [],
            youtubeVideoId: null
        }
    }
    getMovieDetails = async () => {
        const { id } = this.props.match.params;
        await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${environment.MOVIE_DB_API_KEY}&language=en-US`, { method: 'GET' })
            .then(result => result.json())
            .then(res => {
                this.setState({                    
                    item: res
                })
                this.getYoutubeVideoId();
            });
    }

    getYoutubeVideoId = async () => {
        //ADD YOUTUBE API KEY
        let { title } = this.state.item;
        let youtubeSearchEndpoint = `https://www.googleapis.com/youtube/v3/search?key=${environment.YOUTUBE_API_KEY}&maxResults=10&part=snippet`;
        let searchQuery = `${youtubeSearchEndpoint}&q=${title} official trailer`;
        await fetch(searchQuery)
            .then(result => result.json())
            .then(res => {
                this.setState({
                    isLoading: false,                    
                    youtubeVideoId: res.items[0].id.videoId
                });
            });
    }

    componentWillMount() {        
        if(this.state.item == null){
            this.getMovieDetails();
        }        
    }
    render() {        
        let { item, isLoading } = this.state;
        if (isLoading) {
            return <LoadingSpinner />
        } else {
            return (
                <div className="container movie-details">
                    <div className="poster">
                        <img src={"http://image.tmdb.org/t/p/w300/" + item.poster_path} alt="" />
                        <h1 className="title">
                            {item.title}
                            <span>{item.release_date}</span>
                        </h1>
                        <div className="youtube-frame">
                            <iframe title={item.title} width="560" height="380" src={"https://www.youtube.com/embed/" + this.state.youtubeVideoId + "?&autoplay=1"} frameBorder="0" allowFullScreen></iframe>
                        </div>
                    </div>
                    <div className="genres">
                        {
                            item.genres.map((genre) => 
                                <span key={genre.id}>{genre.name}</span>
                            )
                        }
                    </div>
                    <div className="overview">
                        <p>
                            {item.overview}
                        </p>
                    </div>
                </div>
            );
        }
    }
}
export default MovieDetail;