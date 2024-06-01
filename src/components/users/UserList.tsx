import  { useEffect, useState } from 'react';
import ReseniaForm from '../Resenia';
import { deleteReseniaRequest, getReseniaRequest, updateReseniaRequest } from '../../api/resenia';
import { Resenia } from '../../interaces/resenia.interface';

function UserList() {
    const [reviews, setReviews] = useState<Resenia[]>([]);
    const [review, setReview] = useState('');
    const [rating, setRating] = useState<string | null>(null);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [editReviewId, setEditReviewId] = useState<string | null>(null);

    useEffect(() => {
        getReseniaRequest()
            .then(response => response.json())
            .then(data => setReviews(data));
    }, []);

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
                iduser: 'exampleUserId'
            };

            if (editMode && editReviewId) {
                const res = await updateReseniaRequest(editReviewId, newReview);
                if (res.ok) {
                    setReviews(reviews.map(r => r._id === editReviewId ? { ...r, ...newReview } : r));
                    closeEditModal(); // Cierra el modal después de editar
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
        <div className="mt-4 w-full">
            <h3 className="text-2xl font-bold">Reseñas</h3>
            {reviews.length > 0 ? (
                reviews.map((r) => (
                    <ReseniaForm
                        resenia={r}
                        key={r._id}
                        onEdit={() => handleEditReview(r)}
                        onDelete={() => handleDeleteReview(r._id)}
                    />
                ))
            ) : (
                <p className="text-gray-400 mt-2">Aún no hay reseñas. Sé el primero en escribir una.</p>
            )}

            {/* Modal para editar reseñas */}
            {editMode && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg font-medium leading-6 text-gray-900">Editar reseña</h3>
                                        <div className="mt-2">
                                            <textarea
                                                className="w-full p-2 mt-2 text-black"
                                                value={review}
                                                onChange={(e) => setReview(e.target.value)}
                                            />
                                            <input
                                                type="number"
                                                className="w-full p-2 mt-2 text-black"
                                                value={rating || ''}
                                                onChange={(e) => setRating(e.target.value)}
                                                placeholder="Calificación (1-10)"
                                                min="1"
                                                max="10"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    onClick={handleReviewSubmit}
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Actualizar
                                </button>
                                <button
                                    onClick={closeEditModal}
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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
