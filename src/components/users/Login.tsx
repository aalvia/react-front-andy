import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { loginUserReques } from '../../api/user'

import swal from 'sweetalert'; 
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
    const res = await  loginUserReques(user);
    const data = await res.json();
    console.log(data);
    if (res.ok) {
     swal("Usuario Logeado", "¡Bienvenido!", "success"); 
     login(data._id);// Muestra el mensaje de éxito
     // Redirige a la ruta "/"
     localStorage.setItem('user', JSON.stringify(data)); 
     navigate('/');
     //localStorage.setItem('user', JSON.stringify(user)); 
    login(user);
    navigate('/');
   } else {
     swal("Error", "Hubo un error al logear el usuario", "error"); // Muestra un mensaje de error
   }

   
    // Aquí harías una petición a tu API de login
    // Simulamos un login exitoso
    
  };

  return (
    <div className='bg-zinc-900 h-96 text-white flex items-center justify-center'>
      <div className='bg-gray-950 p-4 w-2/5 '>
        <h1 className='text-3xl font-bold text-center block my-2'>Login</h1>
        <div>
          <form onSubmit={handleSubmit}>
            <input
              className="border-2 border-gray-700 p-2 rounded-lg
               bg-zinc-800 block w-full my-2"
              placeholder="Username"
              type="text"
              name="username"
              onChange={handleChange}
            />
            <input
              className="border-2 border-gray-700 p-2 rounded-lg
               bg-zinc-800 block w-full my-2"
              placeholder="Password"
              type="password"
              name="password"
              onChange={handleChange}
            />
            <button className="bg-indigo-500 px-3 block py-2 w-full">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
