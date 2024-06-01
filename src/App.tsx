import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import UserForm from './components/users/UserForm';

import UserProfile from './components/users/UserProfile';
import Login from './components/users/Login';
import MovieSearch from './components/MovieSearch';
import MovieDetails from './components/MovieDetails';
import { AuthProvider, useAuth } from './context/AuthContext';
import { useEffect } from "react";
const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className='bg-zinc-900 h-screen '>
          <div className='bg-gray-950 p-4 w-5/5 text-right'>
            <Link to="/">
              <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-left'>
                Ir a Películas
              </button>
            </Link>
            <AuthButton />
          </div>
          <div className='bg-zinc-900 text-white flex items-center justify-center'>
            <div className='bg-gray-950 w-4/5'>
              <Routes>
                <Route path="/" element={<MovieSearch />} />
                <Route path="/user" element={<UserForm />} />
                <Route path="/movies/:id" element={<MovieDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/UserProfile" element={<UserProfile />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
};

const AuthButton: React.FC = () => {
  const { user, logout } = useAuth();
  const { login } = useAuth();
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      login(parsedUser);  
    }
  }, []);


  const handleLogout = () => {
    // Limpia la información del usuario en el localStorage al hacer logout
    localStorage.removeItem('user');
    logout();
  };
  return user ? (
    <div>
       <Link to="/UserProfile">
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
        perfil
      </button>
    </Link>
    <Link to="/Login">
       <button
      className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
      onClick={handleLogout}
    >
      Logout
    </button>
    </Link>
    </div>
   
  ) : (
    <div>
    <Link to="/User">
    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded'>
      Registrar
    </button>
    </Link>
    <Link to="/Login">
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
        Login
      </button>
    </Link>
    </div>
  );
};

export default App;
