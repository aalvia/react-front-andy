
import { Resenia } from "../interaces/resenia.interface"

interface Props {
    resenia: Resenia;
    onEdit: () => void;
    onDelete: () => void; 
}
//function ReseniaForm({resenia}: Props)
const ReseniaForm: React.FC<Props> = ({ resenia, onEdit,onDelete }) =>{
    const handleDeleteReview = () => {
        // Llama a la función de eliminación proporcionada desde MovieDetails
        onDelete();
    };
  
        return(
            <div key={resenia._id} className="bg-gray-700 p-4 rounded-lg mt-2">
                <div className="flex gap-x-2 float-right">
                <button onClick={onEdit}>update</button>
                <button onClick={handleDeleteReview}>delete</button>
              </div>
                <p><strong>Calificación:</strong> {resenia.estrellas}/10</p>
                <p><strong>Reseña:</strong> {resenia.detalle}</p>
               
              </div>
             
        )
}
export default ReseniaForm

/**/
// import { useState, ChangeEvent, FormEvent } from "react";
// import { createUserRequest } from '../api/user'
// function Resenia() {
//   const [user, setUser] = useState({
//     id: "",
//     idusuario: "",
//     descripcion: "",
//     estrellas: 0
//   });

//   const handleChange=(e:  ChangeEvent<HTMLInputElement>) => {
//     setUser({...user,[e.target.name]:e.target.value});
//   }

//   const handleSubmit= async (e:FormEvent<HTMLFormElement>) => {
//    e.preventDefault()
//    console.log(user)
//    const res = await createUserRequest(user);
//    const data = await res.json();
//    console.log(data);
//   }

//   return (
//     <div className='bg-zinc-900 h-screen text-white flex items-center justify-center'>
//     <div className='bg-gray-950 p-4 w-1/5 '>
//       <h1 className='text-3xl font-bold text-center block my-2'>Usuario</h1>
     
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input
//           className="border-2 border-gray-700 p-2 rounded-lg
//              bg-zinc-800 block w-full my-2"
//           placeholder="ingresar usuario"
//           type="text"
//           name="username"
//           onChange={handleChange}
//         />
//         <input
//           className="border-2 border-gray-700 p-2 rounded-lg
//              bg-zinc-800 block w-full my-2"
//           placeholder="ingresar email"
//           type="email"
//           name="email"
//           onChange={handleChange}
//         />
//         <input
//           className="border-2 border-gray-700 p-2 rounded-lg
//              bg-zinc-800 block w-full my-2"
//           placeholder="ingresar password"
//           type="text"
//           name="password"
//           onChange={handleChange}
//         />
//         <button className="bg-indigo-500 px-3 block py-2 w-full">save</button>
//       </form>
//     </div>
//     </div>
//     </div>
//   );
// }

// export default Resenia;
