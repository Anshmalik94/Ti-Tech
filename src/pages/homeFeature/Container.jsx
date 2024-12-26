import React, { useState } from 'react';
import Card from './Card';
import Modal from './Modal';
import img1 from './cdm/p3.png';
import img2 from './cdm/p1.jpg';
import img3 from './cdm/p2.png';

const Container = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const handleReadMore = (content) => {
    setModalContent(content);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="App" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
      <Card 
        img={img1} 
        description="List of Important Topics for Class 10 Maths Board Exam 2024"
        onReadMore={() => handleReadMore("Class 10 Maths NCERT: Undoubtedly a pivotal resource, this book is indispensable for students. It encompasses every chapter and exercise, serving as a fundamental tool for reading and practicing.")}
      />
      <Card 
        img={img2} 
        description="Here are some resources for problem solving in CBSE class 10."
        onReadMore={() => handleReadMore("The NCERT textbook and solutions can help students prepare for the final exam. The solutions are based on the CBSE syllabus and are designed to be easy to understand. The NCERT Exemplar book includes additional questions to help students get familiar with advanced concepts")}
      />
      <Card 
        img={img3} 
        description="The CBSE is India's national education board for public and private schools, managed by the Government of India."
        onReadMore={() => handleReadMore("The latest CBSE Class 10 Syllabus, provided by Vedantu, contains comprehensive information about deleted chapters, related topics, weightage of marks, study materials, and feature details. Download the CBSE Syllabus 2024-25 from Vedantu in FREE PDF format.")}
     />

      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        content={modalContent} 
      />
    </div>
  );
};

export default Container;
