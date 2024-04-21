/*
import React, { Component } from 'react';
import { fetchMovies } from "../actions/movieActions";
import { setMovie } from "../actions/movieActions";
import {connect} from 'react-redux';
import {Image, Nav} from 'react-bootstrap';
import { Carousel } from 'react-bootstrap';
import { BsStarFill} from 'react-icons/bs'
import {LinkContainer} from 'react-router-bootstrap';

class MovieList extends Component {
    constructor(props) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
    }

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(fetchMovies());
    }

    handleSelect(selectedIndex, e) {
        const {dispatch} = this.props;
        dispatch(setMovie(this.props.movies[selectedIndex]));
    }

    handleClick = (movie) => {
        const {dispatch} = this.props;
        dispatch(setMovie(movie));
    }

    render() {
        const MovieListCarousel = ({movieList}) => {
            if (!movieList) {
                return <div>Loading....</div>
            }

            return (
                <Carousel onSelect={this.handleSelect}>
                    {movieList.map((movie) =>
                        <Carousel.Item key={movie._id}>
                            <div>
                                <LinkContainer to={'/movie/'+movie._id} onClick={()=>this.handleClick(movie)}>
                                    <Nav.Link><Image className="image" src={movie.imageUrl} thumbnail /></Nav.Link>
                                </LinkContainer>
                            </div>
                            <Carousel.Caption>
                                <h3>{movie.title}</h3>
                                <BsStarFill glyph={'star'} /> {movie.avgRating} &nbsp;&nbsp; {movie.releaseDate}
                            </Carousel.Caption>
                        </Carousel.Item>
                    )}

                </Carousel>
            )
        }

        return (
            <MovieListCarousel movieList={this.props.movies} />
        )
    }
}

const mapStateToProps = state => {
    return {
        movies: state.movie.movies
    }
}

export default connect(mapStateToProps)(MovieList);
*/

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchMovies } from "../actions/movieActions";
import { setMovie } from "../actions/movieActions";
import { Carousel } from 'react-bootstrap'; // Import Carousel from react-bootstrap
import { BsStarFill } from 'react-icons/bs'
import { LinkContainer } from 'react-router-bootstrap';
import { Nav } from 'react-bootstrap'; // Import Nav from react-bootstrap

const MovieList = ({ movies, fetchMovies, setMovie }) => {
    useEffect(() => {
        fetchMovies();
    }, [fetchMovies]);

    const handleClick = (movie) => {
        setMovie(movie);
    }

    const MovieListCarousel = ({ movieList }) => {
        if (!movieList || movieList.length === 0) {
            return <div>Loading....</div>
        }

        return (
            <Carousel>
                {movieList.map((movie) =>
                    <Carousel.Item key={movie._id}>
                        <div>
                            <LinkContainer to={'/movie/' + movie._id} onClick={() => handleClick(movie)}>
                                <Nav.Link><img className="image" src={movie.imageUrl} alt={movie.title} /></Nav.Link>
                            </LinkContainer>
                        </div>
                        <Carousel.Caption>
                            <h3>{movie.title}</h3>
                            <BsStarFill /> {movie.avgRating} &nbsp;&nbsp; {movie.releaseDate}
                        </Carousel.Caption>
                    </Carousel.Item>
                )}
            </Carousel>
        )
    }

    return (
        <div>
            <h1>Movie List</h1>
            <MovieListCarousel movieList={movies} />
        </div>
    );
};

const mapStateToProps = state => ({
    movies: state.movie.movies
});

export default connect(mapStateToProps, { fetchMovies, setMovie })(MovieList);
