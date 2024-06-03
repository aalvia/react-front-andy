import { useEffect, useState } from 'react';
import ReseniaForm from '../Resenia';
import { deleteReseniaRequest, getReseniaByUserRequest, updateReseniaRequest } from '../../api/resenia';
import { Resenia } from '../../interaces/resenia.interface';

import StarRating from '../StarRating';
interface UserListProps {
  userid: string;
}

const UserList: React.FC<UserListProps> = ({ userid }) => {
  const [reviews, setReviews] = useState<Resenia[]>([]);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState<string | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editReviewId, setEditReviewId] = useState<string | null>(null);

  useEffect(() => {
    getReseniaByUserRequest(userid)
      .then(response => response.json())
      .then(data => setReviews(data));
  }, [userid]);

  const handleEditReview = (review: Resenia) => {
    setReview(review.detalle || '');
    setRating(review.estrellas || null);
    setEditMode(true);
    setEditReviewId(review._id || null);
  };

  const handleDeleteReview = async (id: string) => {
    const res = await deleteReseniaRequest(id);
    if (res.ok) {
      setReviews(reviews.filter(r => r._id !== id));
    }
  };

  const handleReviewSubmit = async () => {
    if (review && rating) {
      const newReview: Partial<Resenia> = {
        detalle: review,
        estrellas: rating.toString(),
        iduser: userid
      };

      if (editMode && editReviewId) {
        const res = await updateReseniaRequest(editReviewId, newReview);
        if (res.ok) {
          setReviews(reviews.map(r => r._id === editReviewId ? { ...r, ...newReview } : r));
          closeEditModal();
        }
      }
    }
  };

  const closeEditModal = () => {
    setReview('');
    setRating(null);
    setEditMode(false);
    setEditReviewId(null);
  };

  return (
    <div className="mt-8 w-full max-w-3xl mx-auto">
      <h3 className="text-3xl font-semibold text-center mb-6">Reseñas</h3>
      {reviews.length > 0 ? (
        reviews.map((r) => (
          <div key={r._id} className="bg-gray-800 p-4 rounded-lg mb-4 shadow-md">
            {r.namemovie}
            <ReseniaForm
              resenia={r}
              onEdit={() => handleEditReview(r)}
              onDelete={() => handleDeleteReview(r._id)}
            />
          </div>
        ))
      ) : (
        <p className="text-gray-400 text-center">Aún no hay reseñas</p>
      )}

      {editMode && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 py-20 text-center">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
            </div>
            <span className="hidden align-middle h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg w-full">
              <div className="bg-white px-6 py-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Editar reseña</h3>
                <textarea
                  className="w-full p-3 border border-gray-300 text-gray-900 rounded-lg mb-4"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                />
               
                <StarRating rating={rating|| ''} onRatingChange={(e:any) => setRating(e.target.value)} />


              </div>
              <div className="bg-gray-100 px-6 py-3 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleReviewSubmit}
                  className="w-full sm:w-auto inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:text-sm"
                >
                  Actualizar
                </button>
                <button
                  onClick={closeEditModal}
                  type="button"
                  className="mt-3 w-full sm:w-auto inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:text-sm"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserList;
