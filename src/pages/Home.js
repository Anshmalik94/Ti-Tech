import React from 'react';
import './Home.css'; 
import Container from './homeFeature/Container';
import Container2 from './homeFeature/Container2.jsx';
import Container3 from './homeFeature/Container3.jsx';
import k23 from './homeFeature/cdm/coach.webp';
import k24 from './homeFeature/cdm/high.webp';
import k25 from './homeFeature/cdm/inter.webp';
import k26 from './homeFeature/cdm/itt.webp';

const Home = () => {
    return (
        <div className="home-container">
            <section className="hero-section">
                <h1>Welcome To Ti-TECH Training Institute</h1>
                <p>Your journey to learning begins here.</p>
            </section>

            <section className="nk">
                <div className="nn">
                    <h1>Our Recommended Course's</h1>
                </div>
            </section>
            
            <section className="what-we-are">
                <div className="image-container">
                    <img src={k23} alt='not found' />
                </div>
                <div className="text-container">
                    <h2>What We Are</h2>
                    <p>
                        <b>Mission Statement:</b> Share your mission, emphasizing your commitment to academic excellence and skill development in coding.
                        Vision: Outline your vision for shaping the future of students through quality education and innovative teaching methods.
                        Our Services
                        Coaching for 10th and 12th Grades: Describe your approach to subject-specific coaching, exam preparation, and personal development.
                        Coding Education: Highlight the various programming courses offered, from beginner to advanced levels, along with project-based learning opportunities.
                    </p>
                </div>
            </section>

            <section className="nk">
                <div className="nn">
                    <h1>10th Class Courses</h1>
                </div>
            </section>

            <section className="courses-section">
                <section className="what-we-are">
                    <div className="text-container">
                        <h2>Class 10th All Stream</h2>
                        <p>
                            Ti-Tech Training Institute, we provide comprehensive coaching for Class 10th students across all streams-Science,
                            Commerce, and Arts. Our aim is to empower students with the knowledge and skills they need to excel in their exams and build a strong foundation for their future studies.
                            Subject-Specific Coaching: Tailored lessons in Mathematics, Science, Social Science, and English to help students master the curriculum.
                            Expert Faculty: Our experienced teachers are dedicated to fostering a supportive and engaging learning environment.
                        </p>
                    </div>
                    <div className="image-container">
                        <img src={k24} alt='not found' />
                    </div>
                </section>

                <Container />

                <section className="nk">
                    <div className="nn">
                        <h1>12th Class Courses</h1>
                    </div>
                </section>

                <section className="what-we-are">
                    <div className="image-container">
                        <img src={k25} alt='not found' />
                    </div>
                    <div className="text-container">
                        <h2>Class 12th All Stream</h2>
                        <p>
                            Ti-Tech Training Institute, we provide comprehensive coaching for Class 12th students across all streams-Science,
                            Commerce, and Arts. Our aim is to empower students with the knowledge and skills they need to excel in their exams and build a strong foundation for their future studies.
                            Subject-Specific Coaching: Tailored lessons in Mathematics, Science, Social Science, and English to help students master the curriculum.
                            Expert Faculty: Our experienced teachers are dedicated to fostering a supportive and engaging learning environment.
                        </p>
                    </div>
                </section>

                <Container3 />

                <section className="nk">
                    <div className="nn">
                        <h1>IT - Courses</h1>
                    </div>
                </section>

                <section className="what-we-are">
                    <div className="image-container">
                        <img src={k26} alt='not found' />
                    </div>
                    <div className="text-container">
                        <h2>All Software Course's (IT Field)</h2>
                        <p>
                            Ti-Tech Training Institute, we offer a diverse range of software courses designed to equip students with the skills necessary for success in the rapidly evolving IT industry. Our curriculum covers foundational and advanced topics, ensuring students are well-prepared for various career opportunities.
                            Programming Languages courses, such as Python, Java, and C++, emphasize coding proficiency and software development principles, enabling students to build robust applications and solve complex problems.
                        </p>
                        <br />
                    </div>
                </section>
            </section>
            <Container2 />
        </div>
    );
};

export default Home;
