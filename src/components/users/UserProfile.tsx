import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { updateUserRequest, deleteUserRequest } from '../../api/user';
import UserList from './UserList';  
import swal from 'sweetalert';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function UserProfile() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    _id: "",
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      console.log("storedUser", parsedUser);
      setUser(parsedUser);
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await updateUserRequest(user);
    if (res.ok) {
      swal("Usuario actualizado exitosamente", "¡Bien hecho!", "success");
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      swal("Error", "Hubo un error al actualizar el usuario", "error");
    }
  };

  const handleDelete = async () => {
    swal({
      title: "¿Estás seguro?",
      text: "Una vez eliminado, no podrás recuperar este usuario",
      icon: "warning",
      buttons: ["Cancelar", "Eliminar"],
      dangerMode: true,
    }).then(async (willDelete: boolean) => {
      if (willDelete) {
        const res = await deleteUserRequest(user._id);
        if (res.ok) {
          swal("Usuario eliminado exitosamente", { icon: "success" });
          localStorage.removeItem('user');
          logout();
          navigate('/');
          setUser({ _id: "", username: "", email: "", password: "" });
        } else {
          swal("Error", "Hubo un error al eliminar el usuario", "error");
        }
      } else {
        swal("El usuario no ha sido eliminado");
      }
    });
  };

  return (
    <div className="bg-zinc-950 text-white min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Perfil del usuario</h1>
      <div className="bg-gray-950 p-8 rounded-lg shadow-lg w-96">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center border-2 border-gray-700 rounded-lg mb-4 bg-zinc-800">
            <FaUser className="text-gray-400 ml-2" />
            <input
              className="bg-transparent p-2 w-full text-white outline-none"
              placeholder="Username"
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center border-2 border-gray-700 rounded-lg mb-4 bg-zinc-800">
            <FaEnvelope className="text-gray-400 ml-2" />
            <input
              className="bg-transparent p-2 w-full text-white outline-none"
              placeholder="Email"
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center border-2 border-gray-700 rounded-lg mb-6 bg-zinc-800">
            <FaLock className="text-gray-400 ml-2" />
            <input
              className="bg-transparent p-2 w-full text-white outline-none"
              placeholder="Password"
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
            />
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg w-full mb-4">
            Actualizar
          </button>
          <button
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg w-full"
            type="button"
            onClick={handleDelete}
          >
            Eliminar
          </button>
        </form>
      </div>
      <div className="mt-6 w-full flex justify-center">
        <UserList userid={user._id} />
      </div>
    </div>
  );
}

export default UserProfile;
