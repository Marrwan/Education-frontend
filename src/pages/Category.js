import { useState, useEffect } from 'react';
import api from '../api/axios';

const CategoryManagement = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState({ name: '', description: '' });

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

    const handleCreateCategory = async (e) => {
        e.preventDefault();
        try {
            await api.post('/categories', newCategory);
            alert('Category created successfully!');
            setNewCategory({ name: '', description: '' });
            const response = await api.get('/categories');
            setCategories(response.data);
        } catch (error) {
            console.error('Error creating category:', error);
        }
    };

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">Manage Categories</h1>
            <form onSubmit={handleCreateCategory} className="bg-white shadow-md rounded p-6 mb-6">
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Category Name</label>
                    <input
                        type="text"
                        value={newCategory.name}
                        onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Description</label>
                    <textarea
                        value={newCategory.description}
                        onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                        className="w-full p-2 border rounded"
                    ></textarea>
                </div>
                <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
                    Create Category
                </button>
            </form>

            <div>
                <h2 className="text-2xl mb-4">Existing Categories</h2>
                <ul>
                    {categories.map((category) => (
                        <li key={category._id} className="mb-2 bg-gray-100 p-4 rounded shadow">
                            <h3 className="font-semibold">{category.name}</h3>
                            <p>{category.description}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CategoryManagement;
