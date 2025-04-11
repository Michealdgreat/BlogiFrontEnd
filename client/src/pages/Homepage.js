import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './/styles.css'; // Reuse your existing styles

const Homepage = () => {
    const [carouselBanners, setCarouselBanners] = useState([]);
    const [posts, setPosts] = useState([]);
    const [latestPost, setLatestPost] = useState(null);
    const [highlightPost, setHighlightPost] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('jwt');
                const headers = token ? { Authorization: `Bearer ${token}` } : {};

                const [carouselResponse, postsResponse] = await Promise.all([
                    axios.get('http://localhost:3000/api/carousel-banners', { headers }),
                    axios.get('http://localhost:3000/api/posts', { headers }),
                ]);

                setCarouselBanners(carouselResponse.data);
                const postsData = postsResponse.data.slice(0, 3);
                setPosts(postsData);
                setLatestPost(postsData[0]);
                setHighlightPost(postsData[1]);
            } catch (error) {
                console.error('Error fetching data:', error);
                setCarouselBanners([]);
                setPosts([]);
                setLatestPost(null);
                setHighlightPost(null);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="container">
            <nav className="navigation">
                <div className="logo">MyBlogi</div>
                <div className="nav-links">
                    <div className="nav-item">Home</div>
                    <div className="nav-item">Articles</div>
                </div>
                <div className="search-bar">
                    <img src="/search-line-10.svg" alt="Search icon" />
                    <div className="search-text">Search...</div>
                </div>
                <div className="social-icons">
                    <img src="/instagram-fill-10.svg" alt="Instagram" />
                    <img src="/twitter-fill-10.svg" alt="Twitter" />
                    <img src="/linkedin-box-fill-10.svg" alt="LinkedIn" />
                </div>
            </nav>

            <section className="head-section">
                <div className="hero-content">
                    {carouselBanners.length > 0 ? (
                        <>
                            <h1 className="hero-title">{carouselBanners[0].title}</h1>
                            <p className="hero-description">{carouselBanners[0].description}</p>
                        </>
                    ) : (
                        <>
                            <h1 className="hero-title">Make better<br />coffee</h1>
                            <p className="hero-description">learn how to make the best<br />coffee from anywhere.</p>
                        </>
                    )}
                </div>
                <div className="hero-image">
                    <img src="/croods-10.png" alt="Coffee illustration" />
                </div>
            </section>

            <section className="latest-card">
                {latestPost && (
                    <>
                        <div className="latest-content">
                            <h2 className="latest-title">{latestPost.title}</h2>
                            <p className="latest-description">{latestPost.content.substring(0, 100)}...</p>
                            <a href="#" className="read-more">Read more</a>
                        </div>
                        <div className="latest-image">
                            <img src={latestPost.imageUrl} alt="Latest post" />
                        </div>
                    </>
                )}
            </section>

            <section className="card-grid">
                {posts.map(post => (
                    <div className="card" key={post.postId}>
                        <img src={post.imageUrl} alt={post.title} className="card-image" />
                        <h3 className="card-title">{post.title}</h3>
                        <p className="card-description">{post.content.substring(0, 50)}...</p>
                        <a href="#" className="read-more">Read more</a>
                    </div>
                ))}
            </section>

            <section className="highlight-section">
                {highlightPost && (
                    <>
                        <div className="highlight-image">
                            <img src={highlightPost.imageUrl} alt="Highlight post" />
                        </div>
                        <div className="highlight-content">
                            <h2 className="highlight-title">{highlightPost.title}</h2>
                            <p className="highlight-description">{highlightPost.content.substring(0, 100)}...</p>
                            <a href="#" className="read-more">Read more</a>
                        </div>
                    </>
                )}
            </section>

            <footer className="footer">
                <div className="footer-info">
                    <span className="footer-logo">MyBlogi</span>
                    <span className="copyright">2025 copyright all rights reserved</span>
                </div>
                <div className="footer-social">
                    <img src="/instagram-fill-11.svg" alt="Instagram" />
                    <img src="/vector0.svg" alt="Twitter" />
                    <img src="/linkedin-box-fill-11.svg" alt="LinkedIn" />
                </div>
            </footer>
        </div>
    );
};

export default Homepage;