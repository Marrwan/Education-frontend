import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';

const Dashboard = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.get('/users/profile');
                setProfile(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">Welcome, {profile.name}!</h1>

            {/* Profile Overview */}
            <div className="bg-white p-6 rounded shadow-md mb-6">
                <h2 className="text-2xl mb-4">Profile Overview</h2>
                <img src={profile.profilePicture} alt="Profile" className="w-32 h-32 rounded-full mb-4" />
                <p><strong>Email:</strong> {profile.email}</p>
                <p><strong>Joined:</strong> {new Date(profile.createdAt).toLocaleDateString()}</p>
                <Link to="/profile" className="text-blue-500 hover:underline mt-4 inline-block">Edit Profile</Link>
            </div>

            {/* Enrolled Courses */}
            <div className="bg-white p-6 rounded shadow-md mb-6">
                <h2 className="text-2xl mb-4">Your Courses</h2>
                {profile.coursesEnrolled.length > 0 ? (
                    <ul>
                        {profile.coursesEnrolled.map((course, index) => (
                            <li key={index} className="mb-2">
                                <Link to={`/courses/${course.course._id}`} className="text-blue-500 hover:underline">
                                    {course.course.title}
                                </Link> - {course.status}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>You have not enrolled in any courses yet.</p>
                )}
                <Link to="/courses" className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 mt-4 inline-block">
                    Explore Courses
                </Link>
            </div>

            {/* Actions Section */}
            <div className="bg-white p-6 rounded shadow-md">
                <h2 className="text-2xl mb-4">Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <button
                        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                        onClick={() => navigate('/courses')}
                    >
                        View All Courses
                    </button>
                    <button
                        className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700"
                        onClick={() => navigate('/enroll')}
                    >
                        Enroll in a Course
                    </button>
                    <button
                        className="bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700"
                        onClick={() => navigate('/create-course')}
                    >
                        Create Course
                    </button>
                    <button
                        className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
                        onClick={() => navigate('/chat')}
                    >
                        Chat with Users
                    </button>
                    <button
                        className="bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-700"
                        onClick={() => navigate('/profile')}
                    >
                        Edit Profile
                    </button> <button
                        className="bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-700"
                        onClick={() => navigate('/categories')}
                    >
                        Create Category
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
