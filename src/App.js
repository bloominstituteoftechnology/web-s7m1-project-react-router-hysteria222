import React, { useState, useEffect } from "react";
import axios from "axios";
import Movie from "./Movies/Movie";
import MovieList from "./Movies/MovieList";

import SavedList from "./Movies/SavedList";
import { Routes, Route, Link } from "react-router-dom";

export default function App() {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = () => {
      axios
        .get("http://localhost:5001/api/movies") // Study this endpoint with Postman
        .then((response) => {
          setMovies(response.data);
        })
        .catch((error) => {
          console.error("Server Error", error);
        });
    };
    getMovies();
  }, []);

  const addToSavedList = (id) => {
    const number = parseInt(id, 10);
    const movieID = movies.find((movie) => {
      if (number === movie.id) {
        console.log('aaa')
        setSaved((prevSave) => {
          if (
            prevSave.find((saved) => {
              if (saved.id === movie.id) {
                return prevSave;
              }
              return saved
            })
          )
          return movieID
        })
      }
    })
  };

  console.log(saved);

  return (
    <div>
      <SavedList list={[saved]} />

      <Routes>
        <Route path="/" element={<MovieList movies={movies} />} />
        <Route
          path="movies/:id"
          element={<Movie addToSavedList={addToSavedList} />}
        />
      </Routes>
    </div>
  );
}
