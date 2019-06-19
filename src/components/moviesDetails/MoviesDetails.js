import React from 'react';
import './MoviesDetails.css';

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
        await fetch(`https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=${API_KEY_HERE}&language=en-US`, { method: 'GET' })
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
        let youtubeSearchEndpoint = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY_HERE}&maxResults=10&part=snippet`;
        let searchQuery = `${youtubeSearchEndpoint}&q=${this.state.item.title} official trailer`;
        await fetch(searchQuery)
            .then(result => result.json())
            .then(res => {
                this.setState({
                    isLoading: false,
                    youtubeVideoId: res.items[0].id.videoId
                });
            });
    }

    componentDidMount() {
        this.getMovieDetails();
    }
    render() {        
        let { item, isLoading } = this.state;
        if (isLoading) {
            return <div>Loading...</div>
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
                                <span>{genre.name}</span>
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