import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './styles.css';
import API_BASE_URL from '../config';

// Skeleton Loader Component for the Post Page
const PostSkeletonLoader = () => (
    <div className="skeleton-container">
        <div className="skeleton-post-header" />
        <div className="skeleton-post-image" />
        <div className="skeleton-post-content" />
    </div>
);

const PostPage = () => {
    const { postId } = useParams(); // Get the postId from the URL (e.g., f5540f85-f96e-469b-99b4-5bd70858f17d)
    const [post, setPost] = useState(null);
    const [socialMediaLinks, setSocialMediaLinks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const token = localStorage.getItem('jwt');
                const headers = token ? { Authorization: `Bearer ${token}` } : {};

                // Use the correct endpoint with path parameter
                const response = await axios.get(`${API_BASE_URL}/api/Post/GetPostById/${postId}`, { headers });

                console.log('API Response:', response.data); // Log the response for debugging

                if (response.data && response.data.isPublished) {
                    setPost(response.data);
                } else {
                    setError('Post not found or unpublished.');
                }

                // Set social media links (same as Homepage and Articles)
                setSocialMediaLinks([
                    { platform: 'Instagram', url: 'https://instagram.com', icon: '/instagram-fill-10.svg', footerIcon: '/instagram-fill-11.svg' },
                    { platform: 'Twitter', url: 'https://twitter.com', icon: '/twitter-fill-10.svg', footerIcon: '/vector0.svg' },
                    { platform: 'LinkedIn', url: 'https://linkedin.com', icon: '/linkedin-box-fill-10.svg', footerIcon: '/linkedin-box-fill-11.svg' },
                ]);
            } catch (error) {
                console.error('Error fetching post:', error);
                console.error('Error response:', error.response); // Log the error response for debugging
                setError('Failed to load the article. Please try again.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchPost();
    }, [postId]);

    if (isLoading) return <PostSkeletonLoader />;
    if (error) return <div className="container error-message" role="alert">{error}</div>;
    if (!post) return <div className="container error-message" role="alert">Post not found.</div>;

    return (
        <div className="container">
            {/* Navigation (same as Homepage and Articles) */}
            <nav className="navigation">
                <div className="logo">MyBlogi</div>
                <div className="search-bar">
                    <img src="/search-line-10.svg" alt="Search icon" />
                    <div className="search-text">Search...</div>
                </div>
                <div className="nav-links">
                    <Link to="/" className="nav-item">Home</Link>
                    <Link to="/articles" className="nav-item">Articles</Link>
                    <div className="social-icons">
                        {socialMediaLinks.map(link => (
                            <a key={link.platform} href={link.url} target="_blank" rel="noopener noreferrer">
                                <img src={link.icon} alt={link.platform} />
                            </a>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main role="main" className="post-page">
                <article className="post-article">
                    <header className="post-header">
                        <h1 className="post-title">{post.title}</h1>
                        <div className="post-meta">
                            <time dateTime={post.createdAt}>
                                {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                            </time>
                        </div>
                    </header>
                    <div className="post-image">
                        <img src={post.imageUrl} alt={post.title} loading="lazy" />
                    </div>
                    <div className="post-content">
                        <p>{post.content}</p>
                    </div>
                    <div className="post-actions">
                        <Link to="/articles" className="back-to-articles">Back to Articles</Link>
                    </div>
                </article>
            </main>

            {/* Footer (same as Homepage and Articles) */}
            <footer className="footer">
                <div className="footer-info">
                    <span className="footer-logo">MyBlogi</span>
                    <span className="copyright">2025 copyright all rights reserved</span>
                </div>
                <div className="footer-social">
                    {socialMediaLinks.map(link => (
                        <a key={link.platform} href={link.url} target="_blank" rel="noopener noreferrer">
                            <img src={link.footerIcon} alt={link.platform} />
                        </a>
                    ))}
                </div>
            </footer>
        </div>
    );
};

export default PostPage;