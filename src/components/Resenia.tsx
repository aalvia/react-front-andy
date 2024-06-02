import { Resenia } from "../interaces/resenia.interface";
import { useLocation } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface Props {
    usuarioactual?: string;
    resenia: Resenia;
    onEdit: () => void;
    onDelete: () => void;
}

const ReseniaForm: React.FC<Props> = ({ resenia, usuarioactual, onEdit, onDelete }) => {
    const location = useLocation();
    const isUserProfilePage = location.pathname === '/UserProfile';
    const handleDeleteReview = () => {
        onDelete();
    };

    const isCurrentUser = isUserProfilePage || (usuarioactual && usuarioactual === resenia.iduser);

    return (
        <div key={resenia._id} className="bg-gray-800 p-4 rounded-lg shadow-md mt-2 text-black flex items-center justify-between">
            <div>
                <div className="text-lg font-semibold">{resenia.userDetails?.username}</div>
                <p className="mt-2 text-sm text-gray-300"><strong>Calificación:</strong> {resenia.estrellas}/10</p>
                <p className="mt-1 text-sm text-gray-300"><strong>Reseña:</strong> {resenia.detalle}</p>
            </div>
            {isCurrentUser && (
                <div className="flex items-center">
                    <button 
                        onClick={onEdit} 
                        className="text-blue-500 hover:text-blue-400 transition-colors"
                        title="Edit"
                    >
                        <FaEdit />
                    </button>
                    <button 
                        onClick={handleDeleteReview} 
                        className="text-red-500 hover:text-red-400 transition-colors ml-2"
                        title="Delete"
                    >
                        <FaTrash />
                    </button>
                </div>
            )}
        </div>
    );
}

export default ReseniaForm;
