import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { createReseniaRequest,getReseniaRequest ,updateReseniaRequest,deleteReseniaRequest} from '../api/resenia' 
import ReseniaForm from './Resenia';
import { Resenia } from '../interaces/resenia.interface'

import { AuthProvider, useAuth } from '../context/AuthContext';
const MovieDetails: React.FC = () => {


  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<any>(null);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Resenia[]>([])//useState<{ review: string; rating: number }[]>([]);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editReviewId, setEditReviewId] = useState<string | null>(null);
  useEffect(() => {
    const fetchMovieDetails = async () => {
    
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
    }
     // const data = await response.json();
      //setMovie(data);
      setMovie(response);
    };

    fetchMovieDetails();
  }, [id]);


  //const [resenias, setResenias] = useState<Resenia[]>([])
  useEffect(()=>{
      getReseniaRequest().then((response)=> response.json()).then((data)=>setReviews(data))

  },[])


  const handleEditReview = (review: Resenia) => {
    setReview(review.detalle || '');
    setRating(review.estrellas || null);
     setEditMode(true);
     setEditReviewId(review._id || null);
  };

  const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReview(e.target.value);
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRating(e.target.value);
  };

  const handleReviewSubmit = async () => {
    if (review && rating) {
      const newReview: Partial<Resenia> = { detalle: review, estrellas: rating.toString(), iduser: 'exampleUserId' };

      if (editMode && editReviewId) {
        const res = await updateReseniaRequest(editReviewId, newReview);
        if (res.ok) {
          setReviews(reviews.map(r => r._id === editReviewId ? { ...r, ...newReview } : r));
        }
      } else {
        const res = await createReseniaRequest(newReview);
        if (res.ok) {
          const data = await res.json();
          setReviews([...reviews, data]);
        }
      }

      setReview('');
      setRating(null);
      setEditMode(false);
      setEditReviewId(null);
    }

   
  };


  const handleDeleteReview = async (id: string) => {
    // Realiza la solicitud de eliminación
    const res = await deleteReseniaRequest(id);
    if (res.ok) {
        setReviews(reviews.filter(r => r._id !== id)); // Actualiza el estado de las reseñas después de eliminar
    }
};





  if (!movie) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-center my-4">{movie.Title}</h2>
      <div className="flex flex-col items-center">
        <img src={movie.Poster} alt={movie.Title} className="w-full h-64 object-cover rounded-lg" />
        <p className="text-gray-400 mt-2">{movie.Year}</p>
        <p className="text-gray-200 mt-2">{movie.Plot}</p>
        <p className="text-gray-400 mt-2"><strong>Director:</strong> {movie.Director}</p>
        <p className="text-gray-400 mt-2"><strong>Escritores:</strong> {movie.Writer}</p>
        <p className="text-gray-400 mt-2"><strong>Elenco:</strong> {movie.Actors}</p>
        <p className="text-gray-400 mt-2"><strong>Género:</strong> {movie.Genre}</p>
        <p className="text-gray-400 mt-2"><strong>Duración:</strong> {movie.Runtime}</p>
        <p className="text-gray-400 mt-2"><strong>Calificaciones:</strong> {movie.imdbRating}</p>
        <div className="mt-4">
          <h3 className="text-2xl font-bold">Escribir una reseña</h3>
          <textarea
            className="w-full p-2 mt-2 text-black"
            value={review}
            onChange={handleReviewChange}
          />
          <input
            type="number"
            className="w-full p-2 mt-2 text-black"
            value={rating || ''}
            onChange={handleRatingChange}
            placeholder="Calificación (1-10)"
            min="1"
            max="10"
          />
            <AuthButton editMode={editMode} handleReviewSubmit={handleReviewSubmit} />
        </div>
       
        <div className="mt-4 w-full">
          <h3 className="text-2xl font-bold">Reseñas</h3>
          {reviews.length > 0 ? (
       
            reviews.map((r, index) => (
              <ReseniaForm resenia={r} key={r._id} onEdit={() => handleEditReview(r)}  onDelete={() => handleDeleteReview(r._id)} />
              
            ))
          ) : (
            <p className="text-gray-400 mt-2">Aún no hay reseñas. Sé el primero en escribir una.</p>
          )}
        </div>
      </div>
    </div>
  );
};











const AuthButton: React.FC<{ editMode: boolean, handleReviewSubmit: () => void }> = ({ editMode, handleReviewSubmit }) => {
  const { user, logout } = useAuth();

  return user ? (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
      onClick={handleReviewSubmit}
    >
      {editMode ? 'Actualizar' : 'Enviar'}
    </button>
  ) : (
    <Link to="/login">
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
        Login
      </button>
    </Link>
  );
};
export default MovieDetails;
