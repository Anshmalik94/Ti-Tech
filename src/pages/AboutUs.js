import React from 'react';
import './About.css'; 
import img31 from './assets/divanshu.jpg';
import img32 from './assets/Natik.jpg';
import img33 from './assets/Malik.jpg';
import img34 from './assets/aftab.jpg';
import img35 from './assets/ti1.jpg';
import img36 from './assets/ti2.jpg';
import img37 from './assets/ti3.jpg';
import img38 from './assets/ti4.jpg';

const AboutUs = () => {
    const teamMembers = [
        {
            name: 'Divanshu Raj Gupta',
            role: 'CEO',
            image: img31, 
        },
        {
            name: 'Natik Nagar',
            role: 'Management Professor',
            image: img32, 
        },
        {
            name: 'Ansh Malik',
            role: 'Marketer',
            image: img33,
        },
        {
            name: 'Aftab Ansari',
            role: 'Digital Marketer',
            image: img34
        },
    ];

    const galleryImages = [
        img35,
        img36,
        img37,
        img38
    ];

    return (
        <div>
            <div className="team-section">
                <div>
                    <h2 className='leader'>Leadership</h2>
                    <p className='leadership'>
                        Ti-Tech Training Institute, we believe that leadership is not just about guiding others but inspiring growth and innovation. Our leadership team is dedicated to fostering an environment where creativity and collaboration thrive. With a focus on empowering both students and instructors, we lead by example, nurturing the next generation of tech leaders who are prepared to tackle the challenges of tomorrow.
                    </p>
                </div> 
                <div className="team-grid">
                    {teamMembers.map((member, index) => (
                        <div className="team-card" key={index}>
                            <img src={member.image} alt={member.name} className="team-image" />
                            <h3>{member.name}</h3>
                            <p>{member.role}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="gallery-section">
                <div>
                    <h2 className='image-gallery'>Image Gallery</h2>
                    <p className='text'>
                        Ti-Tech Training Institute, we are committed to empowering students with the skills and knowledge they need to thrive in today's fast-paced technology-driven world. Our expert instructors offer hands-on training in cutting-edge courses, ensuring each student gains practical experience alongside theoretical learning. Whether you’re pursuing a career in software development, data science, or other tech fields, Ti-Tech is dedicated to providing top-notch education and a supportive learning environment.
                    </p>
                </div>
                <div className="gallery-grid">
                    {galleryImages.map((image, index) => (
                        <img src={image} alt={`Gallery ${index + 1}`} className="gallery-image" key={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
