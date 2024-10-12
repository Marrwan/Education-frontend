import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import api from '../api/axios';

const socket = io('http://localhost:4000');

const Chat = () => {
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            const profileResponse = await api.get('/users/profile');
            setCurrentUser(profileResponse.data);

            const usersResponse = await api.get('/users/all');
            setUsers(usersResponse.data);
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        socket.on('message', (newMessage) => {
            if (selectedUser && (newMessage.sender === selectedUser._id || newMessage.recipient === selectedUser._id)) {
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            }
        });

        return () => {
            socket.off('message');
        };
    }, [selectedUser]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!message.trim() || !selectedUser) return; // Prevent empty messages

        try {
            const response = await api.post(`/chat/${selectedUser._id}`, { message });
            const chatMessage = response.data.chat;

            // Emit message with sender and recipient IDs
            socket.emit('sendMessage', {
                senderId: currentUser._id,
                recipientId: selectedUser._id,
                message: chatMessage.message,
            });

            setMessages((prevMessages) => [...prevMessages, chatMessage]);
            setMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    useEffect(() => {
        if (selectedUser) {
            const fetchMessages = async () => {
                const messagesResponse = await api.get(`/chat/${selectedUser._id}`); // Fetch chat history
                setMessages(messagesResponse.data);
            };

            fetchMessages();
        }
    }, [selectedUser]);

    return (
        <div className="flex h-screen">
            {/* Users List */}
            <div className="w-1/4 bg-gray-200 p-4 overflow-y-auto">
                <h2 className="text-2xl font-bold mb-4">Users</h2>
                {users.map(user => (
                    <div
                        key={user._id}
                        onClick={() => setSelectedUser(user)}
                        className={`p-2 cursor-pointer hover:bg-gray-300 rounded ${selectedUser?._id === user._id ? 'bg-gray-300' : ''}`}
                    >
                        <img
                            src={user.profilePicture || 'https://via.placeholder.com/50'}
                            alt="Profile"
                            className="w-10 h-10 rounded-full inline mr-2"
                        />
                        {user.name} {user._id === currentUser._id ? '(you)' : ''}
                    </div>
                ))}
            </div>

            {/* Chat Window */}
            <div className="w-3/4 p-4 flex flex-col">
                <div className="flex-1 overflow-y-auto bg-white p-4 mb-4 rounded shadow-md">
                    {selectedUser ? (
                        <>
                            <h2 className="text-xl mb-2">Chat with {selectedUser.name}</h2>
                            <div className="space-y-2">
                                {messages.map((msg, index) => (
                                    <div key={index} className={`flex ${msg.sender === currentUser._id ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`p-2 rounded ${msg.sender === currentUser._id ? 'bg-green-200' : 'bg-blue-200'}`}>
                                            {msg.message}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <p>Select a user to start chatting</p>
                    )}
                </div>
                {selectedUser && (
                    <form onSubmit={handleSendMessage} className="flex">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type a message..."
                            className="w-full p-2 border rounded-l"
                        />
                        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-r">Send</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Chat;
