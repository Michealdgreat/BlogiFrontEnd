import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './styles.css';
import API_BASE_URL from '../config';

const PostSkeletonLoader = () => (
    <div className="skeleton-container">
        <div className="skeleton-post-header" />
        <div className="skeleton-post-image" />
        <div className="skeleton-post-content" />
    </div>
);

const PostPage = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [socialMediaLinks, setSocialMediaLinks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const token = localStorage.getItem('jwt');
                const headers = token ? { Authorization: `Bearer ${token}` } : {};

                const response = await axios.get(`${API_BASE_URL}/api/Post/GetPostById/${postId}`, { headers });

                if (response.data && response.data.isPublished) {
                    setPost(response.data);
                } else {
                    setError('Post not found or unpublished.');
                }

                setSocialMediaLinks([
                    { platform: 'Instagram', url: 'https://instagram.com', icon: '/instagram-fill-10.svg', footerIcon: '/instagram-fill-11.svg' },
                    { platform: 'Twitter', url: 'https://twitter.com', icon: '/twitter-fill-10.svg', footerIcon: '/vector0.svg' },
                    { platform: 'LinkedIn', url: 'https://linkedin.com', icon: '/linkedin-box-fill-10.svg', footerIcon: '/linkedin-box-fill-11.svg' },
                ]);
            } catch (error) {
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
            <nav className="navigation">
                <Link to="/" className="logo">MyBlogi</Link>
                <div className="search-bar">
                    <img src="/search-line-10.svg" alt="Search icon" />
                    <div className="search-text">Search...</div>
                </div>
                <div className="nav-links">
                    <Link to="/" className="nav-item">Home</Link>
                    <Link to="/articles" className="nav-item">Articles</Link>
                    <Link to="/login" className="nav-item">Admin</Link>
                    <div className="social-icons">
                        {socialMediaLinks.map(link => (
                            <a key={link.platform} href={link.url} target="_blank" rel="noopener noreferrer">
                                <img src={link.icon} alt={link.platform} />
                            </a>
                        ))}
                    </div>
                </div>
            </nav>

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