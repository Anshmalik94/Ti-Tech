import React from 'react';
import './Footer.css'; 
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { FaPhoneAlt } from 'react-icons/fa'; // Import phone icon

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <div className="footer-section social-media">
                    <h4>Quick Links</h4>
                    <ul className="social-links">
                        <li>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                <FaFacebook /> Facebook
                            </a>
                        </li>
                        <li>
                            <a href="mailto:info@titechtraining.com" target="_blank" rel="noopener noreferrer">
                                <MdEmail /> Gmail
                            </a>
                        </li>
                        <li>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                <FaTwitter /> Twitter
                            </a>
                        </li>
                        <li>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                <FaInstagram /> Instagram
                            </a>
                        </li>
                        <li>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                                <FaYoutube /> YouTube
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="footer-section contact">
                    <h4>Contact Us</h4>
                    <p>
                        <MdEmail /> Email: 
                        <a href="mailto:natik111111@gmail.com" className="contact-link"> natik111111@gmail.com</a>
                    </p>
                    <p>
                        <FaPhoneAlt /> Phone: +91 7900536801
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
