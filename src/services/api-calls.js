import axios from 'axios';

const movieDbBaseUrl = "https://api.themoviedb.org/3";

const movieDbApi = axios.create({
    baseURL: movieDbBaseUrl,
    params: {
        language: 'en-US'
    }
});

movieDbApi.interceptors.request.use((config) => {
    config.params['api_key'] = process.env.REACT_APP_MOVIE_DB_API_KEY;

    return config;
});

const discoverMovies = async pageNumber => {
    try {
        const searchParams = new URLSearchParams();
        searchParams.append("sort_by", "popularity.desc");
        searchParams.append("page", pageNumber);
        const { data } = await movieDbApi.request(`/discover/movie?${searchParams.toString()}`);
        return data;
    } catch (error) {
        throw error;
    };
};

const searchMovie = async (query, page) => {
    const searchParams = new URLSearchParams();
    searchParams.append("page", page);
    searchParams.append("query", query);
    const response = await movieDbApi.request('/search/movie?' + searchParams.toString());
    return response.data;
};

const getGenres = async () => {
    // ADD THE MOVIEDB API KEY
    try {
        const { data } = await movieDbApi.request('/genre/movie/list');
        return data;
    } catch (error) {
        throw error;
    }
}

const getMovieDetails = async id => {
    try {
        const { data } = await movieDbApi.request(`/movie/${id}`);

        return data;
    } catch (error) {
        throw error;
    }
}

export { movieDbApi, searchMovie, discoverMovies, getGenres, getMovieDetails };