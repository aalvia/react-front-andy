import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import UserForm from './components/users/UserForm';
import UserProfile from './components/users/UserProfile';
import Login from './components/users/Login';
import MovieSearch from './components/movie/MovieSearch';
import MovieDetails from './components/movie/MovieDetails';
import { AuthProvider, useAuth } from './context/AuthContext';
import { useEffect } from 'react';
import { FaFilm, FaSignInAlt, FaUserPlus, FaUser, FaSignOutAlt } from 'react-icons/fa'; // Importamos los iconos

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className='bg-zinc-950 h-screen'>
          <div className='bg-gray-950 p-4 w-full flex justify-between items-center'>
            <Link to="/" className="flex items-center text-white">
              <FaFilm className='text-2xl mr-2' />
              <span className='text-xl font-bold'>Inicio</span>
            </Link>
            <AuthButton />
          </div>
          <div className='bg-zinc-950 text-white flex items-center justify-center'>
            <div className='bg-gray-950 w-4/5 p-4 rounded-lg shadow-lg'>
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
    <div className='flex items-center space-x-4'>
      <Link to="/UserProfile">
        <button className='flex items-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>
          <FaUser className='mr-2' />
          Perfil
        </button>
      </Link>
      <Link to="/Login">
        <button
          className='flex items-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
          onClick={handleLogout}
        >
          <FaSignOutAlt className='mr-2' />
          Logout
        </button>
      </Link>
    </div>
  ) : (
    <div className='flex items-center space-x-4'>
      <Link to="/user">
        <button className='flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
          <FaUserPlus className='mr-2' />
          Registrar
        </button>
      </Link>
      <Link to="/login">
        <button className='flex items-center bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded'>
          <FaSignInAlt className='mr-2' />
          Login
        </button>
      </Link>
    </div>
  );
};

export default App;
