import React from 'react';

import MoviesList from './components/Movies/MoviesList';
import './App.css';

function App() {
  function fetchMoviesHandler() {
    fetch('https://swapi.dev/api/films').then(response => {
      return response.json();
    }).then(data => {
      return data.results;
    });
  }

  return (
    <React.Fragment>
      <section>
        <button>Fetch Movies</button>
      </section>
      <section>
        <MoviesList />
      </section>
    </React.Fragment>
  );
}

export default App;
