import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Enroll from './pages/Enroll';
import Chat from './pages/Chat';
import CreateCourse from './pages/CreateCourse';
import CategoryManagement from './pages/Category';
import { isAuthenticated } from './utils/auth';
import Navbar from "./components/Navbar";

function App() {
    const PrivateRoute = ({ children }) => {
        return isAuthenticated() ? children : <Navigate to="/login" />;
    };

    const RedirectIfLoggedIn = ({ children }) => {
        return isAuthenticated() ? <Navigate to="/dashboard" /> : children;
    };

    return (
        <Router>
            <Navbar/>
            <Routes>
                <Route path="/" element={<RedirectIfLoggedIn><Home /></RedirectIfLoggedIn>} />
                <Route path="/login" element={<RedirectIfLoggedIn><Login /></RedirectIfLoggedIn>} />
                <Route path="/register" element={<RedirectIfLoggedIn><Register /></RedirectIfLoggedIn>} />
                <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="/categories" element={<PrivateRoute component={CategoryManagement} />} />
                <Route path="/courses" element={<PrivateRoute><Courses /></PrivateRoute>} />
                <Route path="/courses/:id" element={<PrivateRoute><CourseDetail /></PrivateRoute>} />
                <Route path="/enroll/:id" element={<PrivateRoute><Enroll /></PrivateRoute>} />
                <Route path="/chat" element={<PrivateRoute><Chat /></PrivateRoute>} />
                <Route path="/create-course" element={<PrivateRoute><CreateCourse /></PrivateRoute>} />
                <Route path="/manage-categories" element={<PrivateRoute><CategoryManagement /></PrivateRoute>} />
            </Routes>
        </Router>
    );
}

export default App;
