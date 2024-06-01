import { useState,useEffect, ChangeEvent, FormEvent } from "react";
import { createUserRequest } from '../../api/user'
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert'; 


import { useAuth } from '../../context/AuthContext';
function UserForm() {
  const { login } = useAuth();

  const navigate = useNavigate();


  
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      login(parsedUser);  
    }
  }, []);

  const handleChange=(e:  ChangeEvent<HTMLInputElement>) => {
    setUser({...user,[e.target.name]:e.target.value});
  }

  const handleSubmit= async (e:FormEvent<HTMLFormElement>) => {
   e.preventDefault()
   console.log(user)
   const res = await createUserRequest(user);
   const data = await res.json();
   console.log(data);
   if (res.ok) {
    swal("Usuario registrado exitosamente", "¡Bienvenido!", "success"); 
    login(data._id);// Muestra el mensaje de éxito
    // Redirige a la ruta "/"
    localStorage.setItem('user', JSON.stringify(data._id)); 
    navigate('/');
  } else {
    swal("Error", "Hubo un error al registrar el usuario", "error"); // Muestra un mensaje de error
  }
  }

  return (
    <div className='bg-zinc-900 h-96 text-white flex items-center justify-center'>
    <div className='bg-gray-950 p-4 w-2/5 '>
      <h1 className='text-3xl font-bold text-center block my-2'>Usuario</h1>
     
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className="border-2 border-gray-700 p-2 rounded-lg
             bg-zinc-800 block w-full my-2"
          placeholder="ingresar usuario"
          type="text"
          name="username"
          onChange={handleChange}
        />
        <input
          className="border-2 border-gray-700 p-2 rounded-lg
             bg-zinc-800 block w-full my-2"
          placeholder="ingresar email"
          type="email"
          name="email"
          onChange={handleChange}
        />
        <input
          className="border-2 border-gray-700 p-2 rounded-lg
             bg-zinc-800 block w-full my-2"
          placeholder="ingresar password"
          type="text"
          name="password"
          onChange={handleChange}
        />
        <button className="bg-indigo-500 px-3 block py-2 w-full">save</button>
      </form>
    </div>
    </div>
    </div>
  );
}

export default UserForm;
