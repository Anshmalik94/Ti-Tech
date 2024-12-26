import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import './Blog.css'; 
import NewsArticles from './NewsArticles';

const Blog = () => {
    const [posts, setPosts] = useState([
        {
            id: 1,
            title: 'For Beginner`s JavaScript tutorial in One Video',
            content: '"JavaScript is a versatile programming language that enables dynamic content on websites, allowing for interactive user experiences. ',
            videoUrl: 'https://www.youtube.com/embed/hKB-YGF14SY',
            date: 'Presented Year 2024',
            likes: 0,
        },
        {
            id: 2,
            title: 'HTML (HyperText Markup Language)',
            content: 'This tutorial introduces essential elements such as headings, paragraphs, links, and images, equipping beginners with the skills to build their first web pages',
            videoUrl: 'https://www.youtube.com/embed/BsDoLVMnmZs', // Updated embed URL
            date: 'Presented Year 2024',
            likes: 0,
        },
        {
            id: 3,
            title: 'CSS (Cascading Style Sheets)',
            content: 'This tutorial covers basic concepts like selectors, properties, and responsive design techniques, empowering beginners to enhance the visual appeal of their websites.',
            videoUrl: 'https://www.youtube.com/embed/Edsxf_NBFrw',

            date: 'Presented Year 2024',
            likes: 0,
        },
    ]);

    useEffect(() => {
        const fetchLikes = async () => {
            try {
                const response = await axios.get('/api/getLikes'); // Replace with your API endpoint
                if (response.data) {
                    const updatedPosts = posts.map((post) => {
                        const matchingPost = response.data.find((item) => item.id === post.id);
                        return matchingPost ? { ...post, likes: matchingPost.likes } : post;
                    });
                    setPosts(updatedPosts);
                }
            } catch (error) {
                console.error("Error fetching likes", error);
            }
        };

        fetchLikes();
    }, []);

    return (
        <div className="blog-container">
            {posts.map((post) => (
                <div className="blog-card" key={post.id}>
                    <h2>{post.title}</h2>
                    <p className="blog-date">{post.date}</p>
                    <p className="blog-content">{post.content}</p>
                    {post.videoUrl && (
                        <div className="video-container">
                            <iframe
                                title={post.title}
                                src={post.videoUrl}
                                allowFullScreen
                                width="100%"
                                height="315"
                            ></iframe>
                        </div>
                    )}
                    {/* Display likes if needed */}
                    {/* <p className="likes">Likes: {post.likes}</p> */}
                </div>
            ))}
            <NewsArticles />
        </div>
    );
};

export default Blog;
