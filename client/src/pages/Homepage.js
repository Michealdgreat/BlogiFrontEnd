import React, { useEffect, useState, memo } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './styles.css';
import API_BASE_URL from '../config';

// Skeleton Loader Component
const SkeletonLoader = () => (
    <div className="skeleton-container">
        <div className="skeleton-carousel" />
        <div className="skeleton-card-grid">
            {Array(3).fill().map((_, i) => (
                <div key={i} className="skeleton-card" />
            ))}
        </div>
        <div className="skeleton-featured" />
    </div>
);

// Carousel Component
const Carousel = memo(({ banners }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3500,
        arrows: true,
        pauseOnHover: true,
    };

    return (
        <section className="head-section" aria-label="Featured Banners">
            <Slider {...settings}>
                {banners.map(banner => (
                    <div key={banner.carouselId} className="carousel-slide">
                        <img
                            src={
                                banner.imageUrl?.startsWith('http')
                                    ? banner.imageUrl
                                    : `${API_BASE_URL}${banner.imageUrl}`
                            }
                            alt=""
                            className="carousel-background"
                            loading="lazy"
                            onError={e => { e.target.src = 'https://via.placeholder.com/1200x400'; }}
                            aria-hidden="true"
                        />
                        <div className="hero-content">
                            <h2 className="hero-title">
                                {banner.title.includes('coffee') ? (
                                    <>
                                        {banner.title.split('coffee')[0]} coffee
                                        <img
                                            src="/coffee-cup-icon.svg"
                                            alt="Coffee cup"
                                            className="coffee-icon"
                                            aria-hidden="true"
                                        />
                                        {banner.title.split('coffee')[1] || ''}
                                    </>
                                ) : (
                                    banner.title
                                )}
                            </h2>
                            <p className="hero-description">{banner.description}</p>
                        </div>
                    </div>
                ))}
            </Slider>
        </section>
    );
});

// Banner Ad Component
const BannerAd = memo(({ ad }) => (
    <section className="card-latest" aria-label="Latest Promotion">
        <div className="card-latest-content">
            <h2 className="card-latest-title">{ad.title}</h2>
            <p className="card-latest-text">{ad.description}</p>
            <div className="card-meta">
                <time dateTime={ad.startDate}>
                    {new Date(ad.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </time>
                <a
                    href={ad.redirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="read-more"
                >
                    Learn More
                </a>
            </div>
        </div>
        <img
            src={ad.imageUrl}
            alt={ad.title}
            className="card-latest-image"
            loading="lazy"
        />
    </section>
));

// Post Card Component
const PostCard = memo(({ post }) => {
    console.log('PostCard postId:', post.postId); // Debug log
    return (
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
});

// Featured Post Component
const FeaturedPost = memo(({ post }) => {
    console.log('FeaturedPost postId:', post.postId); // Debug log
    return (
        <section className="highlight-section" aria-label="Featured Article">
            <div className="highlight-image">
                <img src={post.imageUrl} alt={post.title} loading="lazy" />
            </div>
            <div className="highlight-content">
                <span className="highlight-label">Featured Article</span>
                <h2 className="highlight-title">{post.title}</h2>
                <p className="highlight-text">{post.content.substring(0, 120)}...</p>
                <div className="highlight-meta">
                    <time dateTime={post.createdAt}>
                        {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </time>
                    <Link to={`/post/${post.postId}`} className="highlight-cta">Read Full Story</Link>
                </div>
            </div>
        </section>
    );
});

// Main Homepage Component
const Homepage = () => {
    const [carouselBanners, setCarouselBanners] = useState([]);
    const [posts, setPosts] = useState([]);
    const [featuredPost, setFeaturedPost] = useState(null);
    const [bannerAds, setBannerAds] = useState([]);
    const [socialMediaLinks, setSocialMediaLinks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('jwt');
                const headers = token ? { Authorization: `Bearer ${token}` } : {};

                const [carouselResponse, postsResponse, bannerAdsResponse] = await Promise.all([
                    axios.get(`${API_BASE_URL}/api/CarouselBanner/GetAllCarouselBanners`, { headers }),
                    axios.get(`${API_BASE_URL}/api/Post/GetAllPosts`, { headers }),
                    axios.get(`${API_BASE_URL}/api/BannerAd/GetAllBannerAds`, { headers }),
                ]);

                setCarouselBanners(
                    carouselResponse.data
                        .filter(banner => banner.isActive)
                        .sort((a, b) => a.displayOrder - b.displayOrder)
                );

                const publishedPosts = postsResponse.data
                    .filter(post => post.isPublished)
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setPosts(publishedPosts.slice(0, 6));
                setFeaturedPost(publishedPosts[0] || null);

                const currentDate = new Date();
                setBannerAds(
                    bannerAdsResponse.data.filter(
                        ad =>
                            ad.isActive &&
                            new Date(ad.startDate) <= currentDate &&
                            new Date(ad.endDate) >= currentDate
                    )
                );

                setSocialMediaLinks([
                    { platform: 'Instagram', url: 'https://instagram.com', icon: '/instagram-fill-10.svg', footerIcon: '/instagram-fill-11.svg' },
                    { platform: 'Twitter', url: 'https://twitter.com', icon: '/twitter-fill-10.svg', footerIcon: '/vector0.svg' },
                    { platform: 'LinkedIn', url: 'https://linkedin.com', icon: '/linkedin-box-fill-10.svg', footerIcon: '/linkedin-box-fill-11.svg' },
                ]);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to load content. Please try again.');
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
            <nav className="navigation">
                <div className="logo">MyBlogi</div>
                <div className="search-bar">
                    <img src="/search-line-10.svg" alt="Search icon" />
                    <div className="search-text">Search...</div>
                </div>
                <div className="nav-links">
                    <Link to="/" className="nav-item active">Home</Link>
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
            <main role="main">
                {carouselBanners.length > 0 && (
                    <>
                        <h2 className="section-title section-title--banners">Featured Banners</h2>
                        <Carousel banners={carouselBanners} />
                    </>
                )}
                {bannerAds.length > 0 && (
                    <>
                        <h2 className="section-title section-title--promotion">Latest Promotion</h2>
                        <BannerAd ad={bannerAds[0]} />
                    </>
                )}
                {posts.length > 0 && (
                    <>
                        <h2 className="section-title section-title--articles">Recent Articles</h2>
                        <section className="card-grid" aria-label="Recent Articles">
                            {posts.map(post => (
                                <PostCard key={post.postId} post={post} />
                            ))}
                        </section>
                    </>
                )}
                {featuredPost && (
                    <>
                        <h2 className="section-title section-title--featured">Featured Article</h2>
                        <FeaturedPost post={featuredPost} />
                    </>
                )}

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

export default Homepage;