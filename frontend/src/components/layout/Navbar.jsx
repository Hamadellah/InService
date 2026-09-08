// src/components/layout/Navbar.jsx
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ user }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white shadow-md z-50 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <img src="/src/assets/images/enaa-logo.png" alt="ENAA" className="h-10" />
        <span className="font-bold text-xl text-blue-600">ENAA-Leave</span>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-sm text-gray-600">
          {user?.name} ({user?.position})
        </div>
        <button
          onClick={handleLogout}
          className="text-red-600 hover:text-red-800 transition-colors"
        >
          Déconnexion
        </button>
      </div>
    </nav>
  );
};

export default Navbar;