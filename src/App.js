import React, { useState, useEffect } from 'react'; 
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm.jsx'; 
import LoginForm from './components/LoginForm.js';
import Home from './pages/Home.js';
import Navbar from './components/Navbar/Navbar.jsx';
import Course from './pages/CoursePage.jsx';
import Blog from './pages/Blog.js';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import Cart from './pages/Cart.jsx';
import Footer from './components/Footer.js';
import 'bootstrap/dist/css/bootstrap.min.css'; 

function App() {
    const [cart, setCart] = useState([]);
    const [addresses, setAddresses] = useState([]); 
    const [notification, setNotification] = useState('');

    const handleNotification = (message) => {
        setNotification(message);
        setTimeout(() => {
            setNotification('');
        }, 3000); 
    };

    const addToCart = (course) => {
        setCart((prevCart) => {
            const itemExists = prevCart.find(item => item.id === course.id);
            if (itemExists) {
                handleNotification(`Increased quantity of ${course.title}.`);
                return prevCart.map(item => 
                    item.id === course.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                handleNotification(`Added ${course.title} to cart.`);
                return [...prevCart, { ...course, quantity: 1 }];
            }
        });
    };

    const updateQuantity = (id, change) => {
        setCart((prevCart) => {
            return prevCart.map(item => {
                if (item.id === id) {
                    const newQuantity = item.quantity + change;
                    if (newQuantity <= 0) {
                        handleNotification(`Removed ${item.title} from cart.`);
                        return null; 
                    } else {
                        handleNotification(`${item.title} quantity updated.`);
                        return { ...item, quantity: newQuantity }; 
                    }
                }
                return item;
            }).filter(item => item !== null); 
        });
    };

    const addNewAddress = (address) => {
        setAddresses((prevAddresses) => [...prevAddresses, address]); 
    };

    return (
        <Router>
            <Navbar 
                cartCount={cart.reduce((total, item) => total + item.quantity, 0)} 
            />
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/registrationform" element={<RegistrationForm />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/course" element={<Course addToCart={addToCart} />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/aboutUs" element={<AboutUs />} />
                <Route path="/contact" element={<Contact />} />
                <Route 
                    path="/cart" 
                    element={
                        <Cart 
                            cartItems={cart} 
                            updateQuantity={updateQuantity} 
                            addresses={addresses} 
                            addNewAddress={addNewAddress} 
                            notification={notification} 
                        />
                    } 
                />
                <Route path="/" element={<Navigate to="/home" />} />
            </Routes>
            <footer className="footer">
                <p>&copy; {new Date().getFullYear()} Ti-TECH Training. All rights reserved.</p>
            </footer>
            <Footer />
        </Router>
    );
}

export default App;
