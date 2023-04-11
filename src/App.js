import React, {useState} from 'react';

import MoviesList from './components/Movies/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  function fetchMoviesHandler() {
    fetch('https://swapi.dev/api/films').then(response => {
      return response.json();
    }).then(data => {
      const transformedMovies = data.results.map(result => {
        return {
          title: result.title,
          releaseDate: "release_date",
          openingText: "opening_crawl",
        }
      })
      setMovies(transformedMovies);
    });
  }

  return (
    <React.Fragment>
      <section>
        <button>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies}/>
      </section>
    </React.Fragment>
  );
}

export default App;
