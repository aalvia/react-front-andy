import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { createReseniaRequest ,updateReseniaRequest,deleteReseniaRequest,getReseniaByMovieRequest} from '../../api/resenia' 
import ReseniaForm from '../Resenia';
import { Resenia } from '../../interaces/resenia.interface'
import StarRating from '../StarRating';
import {  useAuth } from '../../context/AuthContext';
const MovieDetails: React.FC<{ imdbID: string }> = ({  }) => {


  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<any>(null);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Resenia[]>([])//useState<{ review: string; rating: number }[]>([]);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editReviewId, setEditReviewId] = useState<string | null>(null);

  const [userdata, setUser] = useState({
    _id:"",
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    // Obtener datos del usuario almacenados en el local storage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser); // Establecer datos del usuario en el estado
    }
  }, []);
  
  useEffect(() => {
    const fetchMovieDetails = async () => {
      const response = await fetch(`http://www.omdbapi.com/?apikey=bdb6d651&i=${id}`);
      const data = await response.json();
      setMovie(data);
    
    };

    fetchMovieDetails();
  }, [id]);

  useEffect(() => {
    if (!movie) return;

    const fetchReviews = async () => {
      try {
        const response = await getReseniaByMovieRequest(movie.imdbID);
        const data = await response.json();
        // Simular un tiempo de espera de 1 segundo antes de establecer las reseñas
        setTimeout(() => {
          setReviews(data);
        }, 1000);
      } catch (error) {
        console.error("Error al obtener las reseñas:", error);
      }
    };
    fetchReviews();
  }, [movie]);



  const handleEditReview = (review: Resenia) => {
    setReview(review.detalle || '');
    setRating(review.estrellas || null);
     setEditMode(true);
     setEditReviewId(review._id || null);
  };

  const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReview(e.target.value);
  };

const handleRatingChange = (rating: string) => {
  setRating(rating);
};


  const handleReviewSubmit = async () => {
    if (review && rating) {
      const newReview: Partial<Resenia> = { detalle: review, estrellas: rating.toString(), iduser: userdata._id, idmovie:movie.imdbID, namemovie:movie.Title };

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
    <div className="p-8 flex flex-col items-center">
  <h2 className="text-3xl font-bold text-center mb-4">{movie.Title}</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full">
    <div className="w-full md:w-auto flex justify-center">
      <div className="w-72 h-96 relative overflow-hidden rounded-lg shadow-xl">
        <img src={movie.Poster} alt={movie.Title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"></div>
      </div>
    </div>
    <div className="flex flex-col w-full">
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
          className="w-full p-2 mt-2 text-black border border-gray-300 rounded"
          value={review}
          onChange={handleReviewChange}
          placeholder="Escribe tu reseña aquí..."
        />
     
        <StarRating rating={rating|| ''} onRatingChange={handleRatingChange} />
        <AuthButton editMode={editMode} handleReviewSubmit={handleReviewSubmit} />
      </div>
    </div>
  </div>
  <div className="mt-8 w-full">
    <h3 className="text-2xl font-bold">Reseñas</h3>
    {reviews.length > 0 ? (
      reviews.map((r) => (
        <ReseniaForm resenia={r} usuarioactual={userdata._id} key={r._id} onEdit={() => handleEditReview(r)} onDelete={() => handleDeleteReview(r._id)} />
      ))
    ) : (
      <p className="text-gray-400 mt-2">Aún no hay reseñas. Sé el primero en escribir una.</p>
    )}
  </div>
</div>

  );
};




const AuthButton: React.FC<{ editMode: boolean, handleReviewSubmit: () => void }> = ({ editMode, handleReviewSubmit }) => {
  const { user } = useAuth();

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
