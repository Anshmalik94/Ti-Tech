import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/submit-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const jsonResponse = await response.json();
                setSuccessMessage(jsonResponse.message);
                setErrorMessage('');
                setFormData({ name: '', email: '', message: '' });
            } else {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message || 'Something went wrong!');
            }
        } catch (error) {
            setErrorMessage(error.message || 'There was an error sending your message. Please try again.');
            setSuccessMessage('');
            console.error(error);
        }
    };

    return (
        <div>
            <div>
                <h1 className='kkm'>
                <a className='kkl'
    href="https://wa.me/917900536801" 
    target="_blank" 
    rel="noopener noreferrer"
>
    Need More Information? Contact Us
</a>

                </h1>
            </div>
            <div className='mapping'>
                <div className="contact-section">
                    <div className="location-map">
                        <h2>Our Location</h2>
                        <iframe
                            title="Location Map"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13427.62679367009!2d77.3407506!3d28.5936291!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce50439e6273f%3A0xa9f0bb5f9d431ae5!2s28%C2%B035'37.1%22N%20%2077%C2%B020'36.0%22E!5e0!3m2!1sen!2sus!4v1697011824277!5m2!1sen!2sus"
                            width="100%"
                            height="300"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                        ></iframe>
                        <h3>Use the map to find the best route to our institute.</h3>
                    </div>
                </div>
                <div className="contact-form">
                    <h2>Contact Us</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-field">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="Enter your name"
                            />
                        </div>
                        <div className="form-field">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className="form-field">
                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                placeholder="Write your message here..."
                            ></textarea>
                        </div>
                        <button type="submit">Send Message</button>
                    </form>
                    {successMessage && <p className="feedback-success">{successMessage}</p>}
                    {errorMessage && <p className="feedback-error">{errorMessage}</p>}
                </div>
            </div>
        </div>
    );
};

export default Contact;
