import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { loginUserReques } from '../../api/user';
import swal from 'sweetalert';
import { FaUser, FaLock } from 'react-icons/fa';

function Login() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(user);
    const res = await loginUserReques(user);
    const data = await res.json();
    console.log(data);
    if (res.ok) {
      swal("Usuario Logeado", "¡Bienvenido!", "success");
      login(data._id); // Muestra el mensaje de éxito
      // Redirige a la ruta "/"
      localStorage.setItem('user', JSON.stringify(data));
      navigate('/');
    } else {
      swal("Error", "Hubo un error al logear el usuario", "error"); // Muestra un mensaje de error
    }
  };

  return (
    <div className='bg-zinc-900 h-4/5 text-white flex items-center justify-center'>
      <div className='bg-gray-950 p-8 rounded-lg shadow-lg w-96'>
        <h1 className='text-3xl font-bold text-center mb-6'>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className='flex items-center border-2 border-gray-700 rounded-lg mb-4 bg-zinc-800'>
            <FaUser className='text-gray-400 ml-2' />
            <input
              className='bg-transparent p-2 w-full text-white outline-none'
              placeholder="Username"
              type="text"
              name="username"
              onChange={handleChange}
            />
          </div>
          <div className='flex items-center border-2 border-gray-700 rounded-lg mb-6 bg-zinc-800'>
            <FaLock className='text-gray-400 ml-2' />
            <input
              className='bg-transparent p-2 w-full text-white outline-none'
              placeholder="Password"
              type="password"
              name="password"
              onChange={handleChange}
            />
          </div>
          <button className='bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg w-full'>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
