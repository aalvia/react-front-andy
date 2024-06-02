import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MovieSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [movie, setMovie] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    try {
      // Simulando la respuesta de la API
      

    const response = await fetch(`http://www.omdbapi.com/?apikey=bdb6d651&t=${query}`);
    const data = await response.json();
    setMovie(data);
    setError(null);
    // if (data.Response === 'False') {
    //   setError(data.Error);
    //   setMovie(null);
    // } else {
    //   setMovie(data);
    //   setError(null);
    // }

      // const response = {
      //   "Title": "Moana",
      //   "Year": "2016",
      //   "Plot": "In ancient Polynesia, when a terrible curse incurred by the demigod Maui reaches Moana's island, she answers the Ocean's call to seek out Maui to set things right.",
      //   "Poster": "https://m.media-amazon.com/images/M/MV5BMjI4MzU5NTExNF5BMl5BanBnXkFtZTgwNzY1MTEwMDI@._V1_SX300.jpg",
      //   "imdbID": "tt3521164"
      // }; 

      // setMovie(response);
      // setError(null);
    } catch (error) {
      setError("Ha ocurrido un error al buscar la película.");
      setMovie(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Realizar la búsqueda solo si hay un valor en el campo de búsqueda
    if (query.trim() !== '') {
      await handleSearch();
    } else {
      setError("Por favor ingresa el nombre de la película.");
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-center my-4">Buscar Películas</h2>
      <form onSubmit={handleSubmit} className="flex justify-center">
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
        <div className="mt-8 flex justify-center">
          <div className="bg-gray-900 p-6 rounded-lg shadow-xl flex flex-col items-center">
            <img src={movie.Poster} alt={movie.Title} className="w-64 h-96 object-cover rounded-lg mb-4" />
            <div className="text-center">
              <h3 className="text-3xl font-bold text-white">{movie.Title}</h3>
              <p className="text-gray-300 text-lg">{movie.Year}</p>
              <p className="text-gray-400 mt-4">{movie.Plot}</p>
              <Link to={`/movies/${movie.imdbID}`} className="mt-8">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full">
                  Ver más detalles
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieSearch;
