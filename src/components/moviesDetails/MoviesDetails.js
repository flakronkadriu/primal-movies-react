import React from 'react';
import './MoviesDetails.css';
import LoadingSpinner from "../../htmlElements/LoadingSpinner";
import { getMovieDetails } from "../../services/api-calls";
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class MovieDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            item: null,
            error: undefined,
            movieGenres: [],
            youtubeVideoId: null
        }
    }
    getMovieDetails = async () => {
        const { id } = this.props.match.params;
        try {
            const data = await getMovieDetails(id);
            this.setState({
                item: data
            }, this.getYoutubeVideoId);
        } catch (error) {
            this.setState({
                error,
                isLoading: false
            });
        }
    }

    getYoutubeVideoId = async () => {
        //ADD YOUTUBE API KEY
        let { title } = this.state.item;
        let youtubeSearchEndpoint = `https://www.googleapis.com/youtube/v3/search?key=${process.env.REACT_APP_YOUTUBE_API_KEY}&maxResults=10&part=snippet`;
        let searchQuery = `${youtubeSearchEndpoint}&q=${title} official trailer`;
        try {
            const { data } = await axios.request(searchQuery);
            this.setState({
                isLoading: false,
                youtubeVideoId: data.items[0].id.videoId
            });
        } catch (error) {
            this.setState({
                isLoading: false,
                error
            });
        }
    }

    componentDidMount() {
        if (this.state.item == null) {
            this.getMovieDetails();
        }
    }
    render() {
        let { item, isLoading, error } = this.state;
        if (error) {
            return <Redirect to="/error-404" />
        } else if (isLoading) {
            return <LoadingSpinner />
        } else {
            const releaseDateYear = item.release_date.split("-")[0];
            return (
                <div className="container">
                    <div className="poster">
                        <img src={"http://image.tmdb.org/t/p/w300/" + item.poster_path} alt="" />
                        <div className="movie-details">
                            <h1 className="title">
                                {item.title} &nbsp; ({releaseDateYear})
                        </h1>
                            <div className="youtube-frame">
                                <iframe title={item.title} width="560" height="380" src={"https://www.youtube.com/embed/" + this.state.youtubeVideoId + "?&autoplay=1"} frameBorder="0" allowFullScreen></iframe>
                            </div>
                            <div className="genres">
                                {
                                    item.genres.map((genre) =>
                                        <span key={genre.id}>{genre.name}</span>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className="overview-details">
                        {item.overview}
                    </div>
                </div>
            );
        }
    }
}
export default MovieDetails;