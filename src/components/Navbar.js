import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <nav className="bg-blue-600 text-white p-4">
            <div className="container mx-auto flex justify-between">
                <Link to="/dashboard" className="text-xl font-bold">Course Platform</Link>
                <div>
                    <Link to="/courses" className="mr-4">Courses</Link>
                    <Link to="/chat" className="mr-4">Chat</Link>
                    {isAuthenticated() ? (
                        <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
                    ) : (
                        <Link to="/login" className="bg-green-500 px-4 py-2 rounded">Login</Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
