import { useState } from 'react';
import axios from 'axios';
import './RegistrationForm.css';
import { Link, useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setErrors({
            ...errors,
            [e.target.name]: ''
        });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.username) newErrors.username = 'Username is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
            try {
                const response = await axios.post('http://localhost:5000/registration', formData);
                setSuccessMessage(response.data.message);
                setErrorMessage('');
                setFormData({ username: '', email: '', password: '' });
                navigate('/login');
            } catch (error) {
                if (error.response) {
                    setErrorMessage(error.response.data.message || 'Error registering user.');
                } else if (error.request) {
                    setErrorMessage('No response from the server. Please try again later.');
                } else {
                    setErrorMessage('Unexpected error occurred.');
                }
                setSuccessMessage('');
            }
        } else {
            setErrors(validationErrors);
        }
        setLoading(false);
    };

    return (
        <div className="form9-container">
            <h2 className="form-header">Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label" htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="form-input"
                        value={formData.username}
                        onChange={handleInputChange}
                        placeholder="Enter your username"
                    />
                    {errors.username && <span className="form-error">{errors.username}</span>}
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-input"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                    />
                    {errors.email && <span className="form-error">{errors.email}</span>}
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="form-input"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Enter your password"
                    />
                    {errors.password && <span className="form-error">{errors.password}</span>}
                </div>
                <button type="submit" className="form-submit" disabled={loading}>
                    {loading ? 'Registering...' : 'Register'}
                </button>
                {successMessage && <span className="form-success">{successMessage}</span>}
                {errorMessage && <span className="form-error">{errorMessage}</span>}
                Already have an account? <Link className='register-link' to="/login">Login here</Link>
            </form>
        </div>
    );
};

export default RegistrationForm;
