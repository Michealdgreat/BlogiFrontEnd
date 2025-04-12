import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './styles.css';
import API_BASE_URL from '../config';

// Reuse the SkeletonLoader component from Homepage
const SkeletonLoader = () => (
    <div className="skeleton-container">
        <div className="skeleton-card-grid">
            {Array(6).fill().map((_, i) => (
                <div key={i} className="skeleton-card" />
            ))}
        </div>
    </div>
);

// Reuse the PostCard component from Homepage
const PostCard = ({ post }) => (
    <article className="card">
        <div className="card-image">
            <img src={post.imageUrl} alt={post.title} loading="lazy" />
        </div>
        <div className="card-content">
            <h3 className="card-title">{post.title}</h3>
            <p className="card-text">{post.content.substring(0, 80)}...</p>
            <div className="card-meta">
                <time dateTime={post.createdAt}>
                    {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </time>
                <Link to={`/post/${post.postId}`} className="read-more">Read More</Link>
            </div>
        </div>
    </article>
);

const Articles = () => {
    const [posts, setPosts] = useState([]);
    const [socialMediaLinks, setSocialMediaLinks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('jwt');
                const headers = token ? { Authorization: `Bearer ${token}` } : {};

                // Fetch posts from the API
                const postsResponse = await axios.get(`${API_BASE_URL}/api/Post/GetAllPosts`, { headers });

                // Filter for published posts and sort by createdAt (most recent first)
                const publishedPosts = postsResponse.data
                    .filter(post => post.isPublished)
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setPosts(publishedPosts);

                // Set social media links (same as Homepage)
                setSocialMediaLinks([
                    { platform: 'Instagram', url: 'https://instagram.com', icon: '/instagram-fill-10.svg', footerIcon: '/instagram-fill-11.svg' },
                    { platform: 'Twitter', url: 'https://twitter.com', icon: '/twitter-fill-10.svg', footerIcon: '/vector0.svg' },
                    { platform: 'LinkedIn', url: 'https://linkedin.com', icon: '/linkedin-box-fill-10.svg', footerIcon: '/linkedin-box-fill-11.svg' },
                ]);
            } catch (error) {
                console.error('Error fetching articles:', error);
                setError('Failed to load articles. Please try again.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    if (isLoading) return <SkeletonLoader />;
    if (error) return <div className="container error-message" role="alert">{error}</div>;

    return (
        <div className="container">
            {/* Navigation (same as Homepage) */}
            <nav className="navigation">
                <Link to="/" className="logo">MyBlogi</Link>
                <div className="search-bar">
                    <img src="/search-line-10.svg" alt="Search icon" />
                    <div className="search-text">Search...</div>
                </div>
                <div className="nav-links">
                    <Link to="/" className="nav-item">Home</Link>
                    <Link to="/articles" className="nav-item active">Articles</Link>
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

            {/* Main Content */}
            <main role="main">
                <h1 className="articles-title">All Articles</h1>
                {posts.length > 0 ? (
                    <section className="card-grid" aria-label="All articles">
                        {posts.map(post => (
                            <PostCard key={post.postId} post={post} />
                        ))}
                    </section>
                ) : (
                    <p className="no-articles">No articles found.</p>
                )}
            </main>

            {/* Footer (same as Homepage) */}
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

export default Articles;