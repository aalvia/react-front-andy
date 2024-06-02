import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { createUserRequest } from '../../api/user';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(user);
    const res = await createUserRequest(user);
    const data = await res.json();
    console.log(data);
    if (res.ok) {
      swal("Usuario registrado exitosamente", "¡Bienvenido!", "success");
      login(data._id); // Muestra el mensaje de éxito
      localStorage.setItem('user', JSON.stringify(data));
      navigate('/');
    } else {
      swal("Error", "Hubo un error al registrar el usuario", "error"); // Muestra un mensaje de error
    }
  };

  return (
    <div className='bg-zinc-900  text-white flex items-center justify-center'>
      <div className='bg-gray-950 p-8 rounded-lg shadow-lg w-96'>
        <h1 className='text-3xl font-bold text-center mb-6'>Registrar Usuario</h1>
        <form onSubmit={handleSubmit}>
          <div className='flex items-center border-2 border-gray-700 rounded-lg mb-4 bg-zinc-800'>
            <FaUser className='text-gray-400 ml-2' />
            <input
              className='bg-transparent p-2 w-full text-white outline-none'
              placeholder="Ingresar usuario"
              type="text"
              name="username"
              onChange={handleChange}
            />
          </div>
          <div className='flex items-center border-2 border-gray-700 rounded-lg mb-4 bg-zinc-800'>
            <FaEnvelope className='text-gray-400 ml-2' />
            <input
              className='bg-transparent p-2 w-full text-white outline-none'
              placeholder="Ingresar email"
              type="email"
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className='flex items-center border-2 border-gray-700 rounded-lg mb-6 bg-zinc-800'>
            <FaLock className='text-gray-400 ml-2' />
            <input
              className='bg-transparent p-2 w-full text-white outline-none'
              placeholder="Ingresar password"
              type="password"
              name="password"
              onChange={handleChange}
            />
          </div>
          <button className='bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg w-full'>
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserForm;
