import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { updateUserRequest } from '../../api/user';
import UserList from './UserList';  
import swal from 'sweetalert';

function UserProfile() {
  const [user, setUser] = useState({
    id:"",
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Actualizar el estado del usuario al cambiar los campos del formulario
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Realizar solicitud de actualización del usuario
    const res = await updateUserRequest(user);
    if (res.ok) {
      swal("Usuario actualizado exitosamente", "¡Bien hecho!", "success");
      // Actualizar datos del usuario en el local storage si es necesario
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      swal("Error", "Hubo un error al actualizar el usuario", "error");
    }
  };

  return (
    <div>
      <h1 className='text-3xl font-bold text-center block my-2'>Perfil del usuario</h1>
      <div className='bg-zinc-900 h-96 text-white flex items-center justify-center'>
        <div className='bg-gray-950 p-4 w-2/5'>
          <form onSubmit={handleSubmit}>
            <input
              className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
              placeholder="Username"
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
            />
            <input
              className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
              placeholder="Email"
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
            <input
              className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
              placeholder="Password"
              type="text"
              name="password"
              value={user.password}
              onChange={handleChange}
            />
            <button className="bg-indigo-500 px-3 block py-2 w-full">Actualizar</button>
          </form>
        </div>
      </div>
      <div>
      <UserList />
        {/* Aquí puedes agregar la lista de usuarios si es necesario */}
      </div>
    </div>
  );
}

export default UserProfile;
