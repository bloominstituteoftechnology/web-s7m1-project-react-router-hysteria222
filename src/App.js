import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Movie from './Movies/Movie'
import MovieList from './Movies/MovieList';

import SavedList from './Movies/SavedList';
import { Routes, Route, Link} from 'react-router-dom';

export default function App () {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = () => {
      axios
        .get('http://localhost:5001/api/movies') // Study this endpoint with Postman
        .then(response => {
          console.log(response.data)
          setMovies(response.data)
        })
        .catch(error => {
          console.error('Server Error', error);
        });
    }
    getMovies();
  }, []);

  const addToSavedList = id => {
    // This is stretch. Prevent the same movie from being "saved" more than once
  };

  return (
    
    <div>
      <SavedList list={[ /* This is stretch */]} />
      
      <Routes>
        <Route path="/" element={<MovieList movies={movies} />} /> 
        <Route path="movies/:id" element={<Movie /> } /> 
      </Routes>

    </div>
  );
}
