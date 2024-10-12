import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';

const CourseDetail = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await api.get(`/courses/${id}`);
                setCourse(response.data);
            } catch (error) {
                console.error('Error fetching course:', error);
            }
        };
        fetchCourse();
    }, [id]);

    if (!course) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
            <p className="text-lg mb-4">{course.description}</p>
            <button className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">Enroll Now</button>
        </div>
    );
};

export default CourseDetail;
