import { useState, useEffect } from 'react';
import api from '../api/axios';

const Courses = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await api.get('/courses');
                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-3xl mb-6">Available Courses</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {courses.map((course) => (
                    <div key={course._id} className="bg-white p-4 rounded shadow-md">
                        <h2 className="text-xl font-semibold">{course.title}</h2>
                        <p>{course.description}</p>
                        <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
                            View Course
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Courses;
