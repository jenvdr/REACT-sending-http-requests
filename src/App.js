import React, {useState, useEffect, useCallback} from 'react';

import MoviesList from './components/Movies/MoviesList';
import AddMovie from './components/Movies/AddMovie';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://swapi.dev/api/films');

      if (!response.ok) {
        throw new Error('Something went wrong here!');
      }

      const data = await response.json();
  
      const transformedMovies = data.results.map(result => {
        return {
          id: result.episode_id,
          title: result.title,
          releaseDate: result.release_date,
          openingText: result.opening_crawl,
        }
      })
      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  function addMovieHandler(movie) {
    console.log(movie);
  }

  let content;

  if (movies.length > 0) {
    content = <MoviesList movies={movies}/>
  } else if (error) {
    content = <p>{error}</p>
  } else if (isLoading) {
    content = <p>Loading...</p>
  } else {
    content = <p>Found no movies.</p>
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
