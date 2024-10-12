import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

const CoursesList = () => {
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
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">Available Courses</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {courses.map(course => (
                    <div key={course._id} className="bg-white p-4 rounded shadow-md">
                        <h2 className="text-xl font-semibold">{course.title}</h2>
                        <p>{course.description}</p>
                        <Link
                            to={`/enroll/${course._id}`}
                            className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                        >
                            Enroll Now
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CoursesList;
