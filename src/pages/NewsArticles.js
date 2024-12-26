import React, { useState, useEffect } from 'react';
import './NewsArticles.css';

const NewsArticles = () => {
    const [posts, setPosts] = useState([
        {
            id: 1,
            title: 'To Embed News Feed On Website – Complete Guide',
            content: 'The world is moving fast; everywhere, every time, there is something happening that makes the headlines. So, whether it’s socioeconomic politics, sports, or entertainment, people just want to get the knack for it. While it could be time-consuming and difficult to gather such a large chunk of news from such varied sources, and hence we have RSS for the rescue. RSS might be one of the oldest technology on the internet, but it still holds its relevance, as it creates a dashboard that allows all the desired content in one place.',
            date: 'October 14, 2024',
            likes: 0,
            comments: [],
        },
        {
            id: 2,
            title: 'Steps to Exhibit News Feed On Website Using Tagembed',
            content: 'Some of the notable and useful features include the customization feature that allows users to personalize their widgets as per their needs. That means they have the freedom to change the font size and style, widget background, and more. Also, you have the moderation feature that allows you to remove irrelevant and unwanted content from your feed. You also have useful features like custom CSS, CTA, analytics, and more. And all that at pocket-friendly prices. ',
            date: 'October 14, 2024',
            likes: 0,
            comments: [],
        },
        {
            id: 3,
            title: 'Top News Channels To Aggregate the News RSS Feed',
            content: '1. Fox News – If you are looking to display breaking and latest with in-detail coverage, you can add Fox news feed on your website. To get their RSS feed on website you just need to copy this code. 2. Crypto News – Cryptocurrency is the talk of the town; people are highly interested in this topic. They are looking to invest, and would love to read more about it',
            date: 'October 14, 2024',
            likes: 0,
            comments: [],
        },
        {
            id: 2,
            title: 'Aggregate News RSS Feeds Using Tagembed',
            content: 'A newsfeed is a web page that is constantly updating in order to show the latest information or news. It is the ongoing transmission of data. The Facebook newsfeed, for example, represents a user home page, where he/she can see different updates from the pages and people that he/she follows.',
            date: 'October 14, 2024',
            likes: 0,
            comments: [],
        },
    ]);

    const [likedPosts, setLikedPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(2);
    const [sortOption, setSortOption] = useState('date'); 

    useEffect(() => {
        const storedLikes = JSON.parse(localStorage.getItem('likedPosts')) || [];
        setLikedPosts(storedLikes);

        setTimeout(() => {
            const storedPosts = JSON.parse(localStorage.getItem('posts')) || posts;
            setPosts(storedPosts);
            setLoading(false);
        }, 1000);
    }, []);

    const handleLike = (postId) => {
        setPosts((prevPosts) =>
            prevPosts.map((post) => {
                if (post.id === postId) {
                    const isLiked = likedPosts.includes(postId);
                    return {
                        ...post,
                        likes: isLiked ? post.likes - 1 : post.likes + 1,
                    };
                }
                return post;
            })
        );

        setLikedPosts((prevLiked) => {
            const newLikedPosts = prevLiked.includes(postId)
                ? prevLiked.filter((id) => id !== postId)
                : [...prevLiked, postId];

            localStorage.setItem('likedPosts', JSON.stringify(newLikedPosts));
            return newLikedPosts;
        });
    };

    useEffect(() => {
        localStorage.setItem('posts', JSON.stringify(posts));
    }, [posts]);

    const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedPosts = [...filteredPosts].sort((a, b) => {
        if (sortOption === 'title') {
            return a.title.localeCompare(b.title);
        } else if (sortOption === 'likes') {
            return b.likes - a.likes;
        } else {
            return new Date(b.date) - new Date(a.date);
        }
    });

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(sortedPosts.length / postsPerPage);

    const handleCommentSubmit = (postId, comment) => {
        setPosts((prevPosts) =>
            prevPosts.map((post) => {
                if (post.id === postId) {
                    return {
                        ...post,
                        comments: [...post.comments, comment],
                    };
                }
                return post;
            })
        );
    };

    return (
        <div className="news-container">
            <h1>News Feed and Articles</h1>
           <div className='search'> <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            /></div>
           <div className='sortby'> <select onChange={(e) => setSortOption(e.target.value)} value={sortOption}>
                <option value="date">Sort by Date</option>
                <option value="title">Sort by Title</option>
                <option value="likes">Sort by Likes</option>
            </select></div>
            {loading ? (
                <p>Loading posts...</p>
            ) : (
                currentPosts.map((post) => (
                    <div className="news-card" key={post.id}>
                        <h2>{post.title}</h2>
                        <p className="news-date">{post.date}</p>
                        <p className="news-content">{post.content}</p>
                        <span className="like-count">Likes: {post.likes}</span>
                        <button className='buttoned' onClick={() => handleLike(post.id)}>
                            {likedPosts.includes(post.id) ? 'Unlike' : 'Like'}
                        </button>

                        <div className="comment-section">
                            <h3>Comments:</h3>
                            <ul>
                                {post.comments.map((comment, index) => (
                                    <li key={index}>{comment}</li>
                                ))}
                            </ul>
                            <CommentForm postId={post.id} onCommentSubmit={handleCommentSubmit} />
                        </div>
                    </div>
                ))
            )}
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => setCurrentPage(index + 1)}
                        className={currentPage === index + 1 ? 'active' : ''}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

// Comment Form Component
const CommentForm = ({ postId, onCommentSubmit }) => {
    const [comment, setComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (comment.trim()) {
            onCommentSubmit(postId, comment);
            setComment('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment..."
                required
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default NewsArticles;
