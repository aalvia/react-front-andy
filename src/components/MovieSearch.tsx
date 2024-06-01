import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MovieSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [movie, setMovie] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = {
      "Title": "Moana",
      "Year": "2016xx",
      "Rated": "PG",
      "Released": "23 Nov 2016",
      "Runtime": "107 min",
      "Genre": "Animation, Adventure, Comedy",
      "Director": "Ron Clements, John Musker, Don Hall",
      "Writer": "Jared Bush, Ron Clements, John Musker",
      "Actors": "Auli'i Cravalho, Dwayne Johnson, Rachel House",
      "Plot": "In ancient Polynesia, when a terrible curse incurred by the demigod Maui reaches Moana's island, she answers the Ocean's call to seek out Maui to set things right.",
      "Language": "English, Russian, French",
      "Country": "United States",
      "Awards": "Nominated for 2 Oscars. 22 wins & 90 nominations total",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMjI4MzU5NTExNF5BMl5BanBnXkFtZTgwNzY1MTEwMDI@._V1_SX300.jpg",
      "Ratings": [
          {
              "Source": "Internet Movie Database",
              "Value": "7.6/10"
          },
          {
              "Source": "Rotten Tomatoes",
              "Value": "95%"
          },
          {
              "Source": "Metacritic",
              "Value": "81/100"
          }
      ],
      "Metascore": "81",
      "imdbRating": "7.6",
      "imdbVotes": "376,591",
      "imdbID": "tt3521164",
      "Type": "movie",
      "DVD": "21 Feb 2017",
      "BoxOffice": "$248,757,044",
      "Production": "N/A",
      "Website": "N/A",
      "Response": "True"
  } //await fetch(`http://www.omdbapi.com/?apikey=bdb6d651&t=${query}`);
    const data = response;//await response.json();
    setMovie(data);
    setError(null);
    // if (data.Response === 'False') {
    //   setError(data.Error);
    //   setMovie(null);
    // } else {
    //   setMovie(data);
    //   setError(null);
    // }
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-center my-4">Buscar Películas</h2>
      <form onSubmit={handleSearch} className="flex justify-center">
        <input
          type="text"
          className="p-2 border rounded-l-lg text-black"
          placeholder="Nombre de la película"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg">
          Buscar
        </button>
      </form>

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      {movie && (
        <div className="mt-8">
          <div className="bg-gray-800 p-4 rounded-lg text-center">
            <img src={movie.Poster} alt={movie.Title} className="w-full h-64 object-cover rounded-lg" />
            <h3 className="text-xl font-bold mt-4">{movie.Title}</h3>
            <p className="text-gray-400">{movie.Year}</p>
            <p className="text-gray-200 mt-2">{movie.Plot}</p>
            <Link to={`/movies/${movie.imdbID}`}>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                Ver más detalles
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieSearch;
