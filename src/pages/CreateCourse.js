import { useState, useEffect } from 'react';
import api from '../api/axios';
import { toast } from 'react-toastify';

const CreateCourse = () => {
    const [categories, setCategories] = useState([]);
    const [courseData, setCourseData] = useState({
        title: '',
        description: '',
        price: '',
        category: '',
        level: 'beginner',
        language: '',
        syllabus: '',
        imageUrl: '',
        resources: '',
        contents: [],
    });
    const [contentItem, setContentItem] = useState({ type: 'video', title: '', duration: '', contentUrl: '' });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get('/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleChange = (e) => {
        setCourseData({ ...courseData, [e.target.name]: e.target.value });
    };

    const handleContentChange = (e) => {
        setContentItem({ ...contentItem, [e.target.name]: e.target.value });
    };

    const addContent = () => {
        setCourseData((prevState) => ({
            ...prevState,
            contents: [...prevState.contents, contentItem],
        }));
        setContentItem({ type: 'video', title: '', duration: '', contentUrl: '' });
        toast.success('Content item added!');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Format syllabus into an array
            const formattedSyllabus = courseData.syllabus.split(',').map((item) => item.trim());
            await api.post('/courses', { ...courseData, syllabus: formattedSyllabus });
            toast.success('Course created successfully!');
        } catch (error) {
            console.error('Error creating course:', error);
            if (error.response && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('An unexpected error occurred.');
            }
        }
    };

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">Create Course</h1>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-6">
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={courseData.title}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Description</label>
                    <textarea
                        name="description"
                        value={courseData.description}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={courseData.price}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Category</label>
                    <select
                        name="category"
                        value={courseData.category}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    >
                        <option value="">Select a Category</option>
                        {categories.map((category) => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Level</label>
                    <select
                        name="level"
                        value={courseData.level}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    >
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Language</label>
                    <input
                        type="text"
                        name="language"
                        value={courseData.language}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Syllabus (comma-separated)</label>
                    <input
                        type="text"
                        name="syllabus"
                        value={courseData.syllabus}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Module 1, Module 2, Module 3"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Image URL</label>
                    <input
                        type="text"
                        name="imageUrl"
                        value={courseData.imageUrl}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Resources (comma-separated URLs)</label>
                    <input
                        type="text"
                        name="resources"
                        value={courseData.resources}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <h3 className="text-xl mb-2">Add Course Content</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
                        <div>
                            <label className="block text-gray-700 mb-2">Content Type</label>
                            <select
                                name="type"
                                value={contentItem.type}
                                onChange={handleContentChange}
                                className="w-full p-2 border rounded"
                            >
                                <option value="video">Video</option>
                                <option value="quiz">Quiz</option>
                                <option value="pdf">PDF</option>
                                <option value="article">Article</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={contentItem.title}
                                onChange={handleContentChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Duration (mins)</label>
                            <input
                                type="number"
                                name="duration"
                                value={contentItem.duration}
                                onChange={handleContentChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                    </div>
                    <div className="mb-2">
                        <label className="block text-gray-700 mb-2">Content URL</label>
                        <input
                            type="text"
                            name="contentUrl"
                            value={contentItem.contentUrl}
                            onChange={handleContentChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={addContent}
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                        Add Content
                    </button>
                </div>
                <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 mt-4">
                    Create Course
                </button>
            </form>
        </div>
    );
};

export default CreateCourse;
