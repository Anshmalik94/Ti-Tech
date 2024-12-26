import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = ({ setIsLoggedIn }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        try {
            const response = await axios.post('http://localhost:5000/login', formData);
            if (response.status === 200) {
                const token = response.data.token;
                localStorage.setItem('token', token);
                setIsLoggedIn(true);
                navigate('/home');
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setErrorMessage('Invalid username or password.');
            } else if (error.response && error.response.data) {
                setErrorMessage(error.response.data.message || 'Error logging in.');
            } else {
                setErrorMessage('Unexpected error occurred.');
            }
        }
    };

    return (
        <div className="form1-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form2-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your username"
                    />
                </div>
                <div className="form2-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your password"
                    />
                </div>
                <button type="submit" className="form4-submit">Login</button>
                {errorMessage && <div className="error">{errorMessage}</div>}
                <p>
                    Don't have an account? <Link className='register-link' to="/registrationform">Register here</Link>.
                </p>
            </form>
        </div>
    );
};

export default LoginForm;
