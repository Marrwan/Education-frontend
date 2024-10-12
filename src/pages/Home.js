import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100">
            <h1 className="text-5xl font-bold text-blue-800 mb-8">Welcome to the Course Platform</h1>
            <p className="text-xl text-gray-700 mb-8">Learn, grow, and build your skills with our courses.</p>
            <div className="space-x-4">
                <Link to="/login" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                    Login
                </Link>
                <button
                    onClick={() => window.location.href = 'http://localhost:4000/api/auth/google'}
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
                >
                    Login with Google
                </button>

                <Link to="/register" className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
                    Register
                </Link>
                <Link to="/courses" className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700">
                    View Courses
                </Link>

            </div>
        </div>
    );
};

export default Home;
