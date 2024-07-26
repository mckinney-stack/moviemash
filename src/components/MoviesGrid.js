import React, { useState, useEffect } from 'react';
import '../styles.css';
import MovieCard from './MovieCard';

export default function MoviesGrid({ movies, watchlist, toggleWatchlist }) {

    const [searchTerm, setSearchTerm] = useState('');   
    const [genre, setGenre] = useState('All Genres');
    const [rating, setRating] = useState('All');

    

    const handleSearchChange = () => (event) => {
        setSearchTerm(event.target.value);
    }
    const handleGenreChange = () => (event) => {
        setGenre(event.target.value);
    }
    const handleRatingChange = () => (event) => {
        setRating(event.target.value);
    }

    const matchesGenre = (movie, genre) => {
        return genre === "All Genres" || movie.genre.toLowerCase() === genre.toLowerCase();
    }
    
    const matchesSearchTerm = (movie, searchTerm) => {
        return movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    }

    const matchesRating = (movie, rating) => {
        switch(rating) {
            case 'Good':
                return movie.rating >= 8;
            case 'Ok':
                return movie.rating >= 5 && movie.rating < 8;
            case 'Bad':
                return movie.rating < 5;
            default:
                return true;
        }
    }

    const filteredMovies = movies.filter((movie) => {
        return matchesGenre(movie, genre) && 
        matchesRating(movie, rating) &&
        matchesSearchTerm(movie, searchTerm); 
    });

    return (
        <div>
            <input 
                type='text' 
                className='search-input' 
                placeholder='Search movies...' 
                onChange={handleSearchChange()}
            />

            <div className='filter-bar'>
                <div className="filter-slot">
                    <label>Genre</label>
                    <select className="filter-dropdown" value={genre} onChange={handleGenreChange()}>
                        <option>All Genres</option>
                        <option>Action</option>
                        <option>Drama</option>
                        <option>Fantasy</option>
                        <option>Horror</option>
                    </select>
                </div>
                <div className="filter-slot">
                    <label>Rating</label>
                    <select className="filter-dropdown" value={rating} onChange={handleRatingChange()}>
                        <option>All</option>
                        <option>Good</option>
                        <option>Ok</option>
                        <option>Bad</option>
                    </select>
                </div>
            </div>

            <div className='movies-grid'>
                {filteredMovies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} toggleWatchlist={toggleWatchlist} isWatchlisted={watchlist.includes(movie.id)} />
                ))}
            </div>
        </div>
    );
    
}