import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './styles.css';
import API_BASE_URL from '../config';

const Homepage = () => {
    const [carouselBanners, setCarouselBanners] = useState([]);
    const [posts, setPosts] = useState([]);
    const [featuredPost, setFeaturedPost] = useState(null);
    const [bannerAds, setBannerAds] = useState([]);
    const [socialMediaLinks, setSocialMediaLinks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const token = localStorage.getItem('jwt');
                const headers = token ? { Authorization: `Bearer ${token}` } : {};

                const [carouselResponse, postsResponse, bannerAdsResponse] = await Promise.all([
                    axios.get(`${API_BASE_URL}/api/CarouselBanner/GetAllCarouselBanners`, { headers }),
                    axios.get(`${API_BASE_URL}/api/Post/GetAllPosts`, { headers }),
                    axios.get(`${API_BASE_URL}/api/BannerAd/GetAllBannerAds`, { headers }),
                ]);

                const activeBanners = carouselResponse.data
                    .filter(banner => banner.isActive)
                    .sort((a, b) => a.displayOrder - b.displayOrder);
                setCarouselBanners(activeBanners);

                const publishedPosts = postsResponse.data
                    .filter(post => post.isPublished)
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

                const gridPosts = publishedPosts.slice(0, 3);
                setPosts(gridPosts);

                setFeaturedPost(publishedPosts[0] || null);

                const currentDate = new Date();
                const activeBannerAds = bannerAdsResponse.data.filter(ad =>
                    ad.isActive &&
                    new Date(ad.startDate) <= currentDate &&
                    new Date(ad.endDate) >= currentDate
                );
                setBannerAds(activeBannerAds);

                setSocialMediaLinks([
                    { platform: 'Instagram', url: 'https://instagram.com', icon: '/instagram-fill-10.svg', footerIcon: '/instagram-fill-11.svg' },
                    { platform: 'Twitter', url: 'https://twitter.com', icon: '/twitter-fill-10.svg', footerIcon: '/vector0.svg' },
                    { platform: 'LinkedIn', url: 'https://linkedin.com', icon: '/linkedin-box-fill-10.svg', footerIcon: '/linkedin-box-fill-11.svg' },
                ]);
            } catch (error) {
                console.error('Error fetching data:', error);
                setCarouselBanners([]);
                setPosts([]);
                setFeaturedPost(null);
                setBannerAds([]);
                setSocialMediaLinks([]);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const carouselSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
    };

    if (isLoading) {
        return <div className="container">Loading...</div>;
    }

    return (
        <div className="container">
            <nav className="navigation">
                <div className="logo">MyBlogi</div>
                <div className="search-bar">
                    <img src="/search-line-10.svg" alt="Search icon" />
                    <div className="search-text">Search...</div>
                </div>
                <div className="nav-links">
                    <div className="nav-item">Home</div>
                    <div className="nav-item">Articles</div>
                    <div className="social-icons">
                        {socialMediaLinks.map(link => (
                            <a key={link.platform} href={link.url} target="_blank" rel="noopener noreferrer">
                                <img src={link.icon} alt={link.platform} />
                            </a>
                        ))}
                    </div>
                </div>
            </nav>

            {carouselBanners.length > 0 && (
                <section className="head-section">
                    <Slider {...carouselSettings}>
                        {carouselBanners.map(banner => (
                            <div key={banner.carouselId} className="carousel-slide">
                                <img
                                    src={
                                        banner.imageUrl && banner.imageUrl.startsWith('http')
                                            ? banner.imageUrl
                                            : banner.imageUrl
                                                ? `${API_BASE_URL}${banner.imageUrl}`
                                                : 'https://via.placeholder.com/1200x400'
                                    }
                                    alt={banner.title}
                                    className="carousel-background"
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/1200x400'; // Fallback on error
                                    }}
                                />
                                <div className="hero-content">
                                    <h1 className="hero-title">
                                        {banner.title.includes('coffee') ? (
                                            <>
                                                {banner.title.split('coffee')[0]} coffee
                                                <img
                                                    src="/coffee-cup-icon.svg"
                                                    alt="Coffee cup"
                                                    className="coffee-icon"
                                                />
                                                {banner.title.split('coffee')[1] || ''}
                                            </>
                                        ) : (
                                            banner.title
                                        )}
                                    </h1>
                                    <p className="hero-description">
                                        {banner.description.split('<br>').map((line, index) => (
                                            <React.Fragment key={index}>
                                                {line}
                                                {index < banner.description.split('<br>').length - 1 && <br />}
                                            </React.Fragment>
                                        ))}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </section>
            )}

            {bannerAds.length > 0 && (
                <section className="card-latest">
                    <div className="card-latest-content">
                        <h2 className="card-latest-title">{bannerAds[0].title}</h2>
                        <p className="card-latest-text">{bannerAds[0].description}</p>
                        <div className="card-meta">
                            <div className="date">
                                {new Date(bannerAds[0].startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </div>
                            <a href={bannerAds[0].redirectUrl} target="_blank" rel="noopener noreferrer" className="read-more">
                                Read more
                            </a>
                        </div>
                    </div>
                    <div className="card-latest-image">
                        <img src={bannerAds[0].imageUrl} alt={bannerAds[0].title} />
                    </div>
                </section>
            )}

            {posts.length > 0 && (
                <section className="card-grid">
                    {posts.map(post => (
                        <div className="card" key={post.postId}>
                            <div className="card-image">
                                <img src={post.imageUrl} alt={post.title} />
                            </div>
                            <div className="card-content">
                                <h3 className="card-title">{post.title}</h3>
                                <p className="card-text">{post.content.substring(0, 100)}...</p>
                                <div className="card-meta">
                                    <div className="date">
                                        {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </div>
                                    <a href={`/post/${post.postId}`} className="read-more">Read more</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>
            )}

            {featuredPost && (
                <section className="highlight-section">
                    <div className="highlight-content">
                        <h2 className="highlight-title">{featuredPost.title}</h2>
                        <p className="highlight-text">{featuredPost.content.substring(0, 150)}...</p>
                        <div className="highlight-meta">
                            <div className="highlight-date">
                                {new Date(featuredPost.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </div>
                            <a href={`/post/${featuredPost.postId}`} className="read-more">Read more</a>
                        </div>
                    </div>
                    <div className="highlight-image">
                        <img src={featuredPost.imageUrl} alt={featuredPost.title} />
                    </div>
                </section>
            )}

            <div className="see-more-container">
                <div className="see-more-button">
                    See more
                    <img src="/arrow-down-circle-fill-10.svg" alt="Arrow down" />
                </div>
            </div>

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

export default Homepage;