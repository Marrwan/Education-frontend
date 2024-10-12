import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';

const Enroll = () => {
    const { id } = useParams();

    useEffect(() => {
        const enrollInCourse = async () => {
            try {
                await api.post(`/users/enroll/${id}`);
                alert('Enrolled successfully!');
            } catch (error) {
                console.error('Error enrolling in course:', error);
            }
        };
        enrollInCourse();
    }, [id]);

    return (
        <div className="flex justify-center items-center min-h-screen">
            <h1 className="text-2xl font-bold">Enrolling...</h1>
        </div>
    );
};

export default Enroll;
