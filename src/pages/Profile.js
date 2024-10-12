// Profile Page (`src/pages/Profile.js`)

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const Profile = () => {
    const [profile, setProfile] = useState({ name: '', email: '', profilePicture: '' });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.get('/users/profile', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                const { name, email, profilePicture } = response.data;
                setProfile({ name, email, profilePicture });
                setLoading(false);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const { name, email, profilePicture } = profile;
            await api.put('/users/profile', { name, email, profilePicture });
            alert('Profile updated successfully!');
            navigate('/dashboard');
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">Profile</h1>
            <form onSubmit={handleUpdate} className="bg-white shadow-md rounded p-6">
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={profile.name}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={profile.email}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Profile Picture URL</label>
                    <input
                        type="text"
                        name="profilePicture"
                        value={profile.profilePicture}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                    Update Profile
                </button>
            </form>
        </div>
    );
};

export default Profile;
