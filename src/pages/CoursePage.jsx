import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import './Course.css';
import Pdf10 from './courseFeatures/Pdf10.jsx';
import Pdf20 from './courseFeatures/Pdf20.jsx';
import Pdf30 from './courseFeatures/Pdf30.jsx';
import img10 from './assets/cover10.jpeg';
import img12 from './assets/cover12.jpg';
import img13 from './assets/fullstack.jpg';
import img14 from './assets/html.jpg';
import img15 from './assets/css.png';
import img16 from './assets/javascript.jpg';

const CoursePage = ({ addToCart }) => {
  const navigate = useNavigate(); // Hook for navigation
  const [searchTerm, setSearchTerm] = useState(''); // State for search term

  const handleAddToCart = (course) => {
    addToCart(course); // Call the addToCart function passed as a prop
    navigate('/cart'); // Redirect to the cart page
  };

  const courses = [
    { id: 1, title: '10th Exam', description: 'Exam Paper sample and also previous Paper and HandNotes Written', price: 100, imageUrl: img10 },
    { id: 2, title: '12th Exam', description: 'Exam Paper sample and also previous Paper and HandNotes Written', price: 200, imageUrl: img12 },
    { id: 3, title: 'Full Stack Development', description: 'All tutorial like HTML, CSS, JavaScript, PHP, Python, Java, C, and C++', price: 300, imageUrl: img13 },
    { id: 4, title: 'Data Science', description: 'Learn data science with Python and R', price: 250, imageUrl: img14 },
    { id: 5, title: 'Cyber Security', description: 'Understand the principles of cybersecurity', price: 350, imageUrl: img15 },
    { id: 6, title: 'Machine Learning', description: 'Introduction to machine learning algorithms', price: 400, imageUrl: img16 },
    // Add more courses as needed
  ];

  // Filter courses based on the search term
  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="course45-page">
      <h2>Available Courses</h2>

      {/* Search Bar */}
      <div className="search-section">
        <input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term state
          className="search-input"
        />
      </div>

      <div className="course-list">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <div key={course.id} className="course-item">
              <img src={course.imageUrl} alt={course.title} className="course-image" />
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <p>Price: ₹{course.price}</p>
              <button onClick={() => handleAddToCart(course)}>Add to Cart</button>
            </div>
          ))
        ) : (
          <p>No courses found.</p>
        )}
      </div>

      <Pdf10 />
      <Pdf20 />
      <Pdf30 />
    </div>
  );
};

export default CoursePage;
