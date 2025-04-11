import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('banner-ads');
    const [bannerAds, setBannerAds] = useState([]);
    const [carouselBanners, setCarouselBanners] = useState([]);
    const [categories, setCategories] = useState([]);
    const [posts, setPosts] = useState([]);
    const [roles, setRoles] = useState([]);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (!token) {
            navigate('/login');
            return;
        }

        const decoded = jwtDecode(token);
        if (decoded.Role !== 'Admin') {
            navigate('/login');
            return;
        }

        const fetchData = async () => {
            try {
                const headers = { Authorization: `Bearer ${token}` };
                const [bannerAdsRes, carouselBannersRes, categoriesRes, postsRes, rolesRes, usersRes] = await Promise.all([
                    axios.get('http://localhost:3000/api/banner-ads', { headers }),
                    axios.get('http://localhost:3000/api/carousel-banners', { headers }),
                    axios.get('http://localhost:3000/api/categories', { headers }),
                    axios.get('http://localhost:3000/api/posts', { headers }),
                    axios.get('http://localhost:3000/api/roles', { headers }),
                    axios.get('http://localhost:3000/api/users', { headers }),
                ]);
                setBannerAds(bannerAdsRes.data);
                setCarouselBanners(carouselBannersRes.data);
                setCategories(categoriesRes.data);
                setPosts(postsRes.data);
                setRoles(rolesRes.data);
                setUsers(usersRes.data);
            } catch (error) {
                console.error('Error fetching admin data:', error);
                if (error.response?.status === 401) {
                    localStorage.removeItem('jwt');
                    navigate('/login');
                }
            }
        };
        fetchData();
    }, [navigate]);

    // Banner Ad Handlers
    const handleCreateBannerAd = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        data.isActive = data.isActive === 'true';
        const token = localStorage.getItem('jwt');
        try {
            await axios.post('http://localhost:3000/api/create-banner-ad', data, {
                headers: { Authorization: `Bearer ${token}` },
            });
            window.location.reload();
        } catch (error) {
            console.error('Error creating banner ad:', error);
        }
    };

    const handleDeleteBannerAd = async (bannerId) => {
        const token = localStorage.getItem('jwt');
        try {
            await axios.delete(`http://localhost:3000/api/delete-banner-ad/${bannerId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            window.location.reload();
        } catch (error) {
            console.error('Error deleting banner ad:', error);
        }
    };

    // Carousel Banner Handlers
    const handleCreateCarouselBanner = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        data.displayOrder = parseInt(data.displayOrder);
        data.isActive = data.isActive === 'true';
        const token = localStorage.getItem('jwt');
        try {
            await axios.post('http://localhost:3000/api/create-carousel-banner', data, {
                headers: { Authorization: `Bearer ${token}` },
            });
            window.location.reload();
        } catch (error) {
            console.error('Error creating carousel banner:', error);
        }
    };

    const handleDeleteCarouselBanner = async (carouselId) => {
        const token = localStorage.getItem('jwt');
        try {
            await axios.delete(`http://localhost:3000/api/delete-carousel-banner/${carouselId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            window.location.reload();
        } catch (error) {
            console.error('Error deleting carousel banner:', error);
        }
    };

    // Category Handlers
    const handleCreateCategory = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        const token = localStorage.getItem('jwt');
        try {
            await axios.post('http://localhost:3000/api/create-category', data, {
                headers: { Authorization: `Bearer ${token}` },
            });
            window.location.reload();
        } catch (error) {
            console.error('Error creating category:', error);
        }
    };

    const handleDeleteCategory = async (categoryId) => {
        const token = localStorage.getItem('jwt');
        try {
            await axios.delete(`http://localhost:3000/api/delete-category/${categoryId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            window.location.reload();
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    // Post Handlers
    const handleCreatePost = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        data.isPublished = data.isPublished === 'true';
        const token = localStorage.getItem('jwt');
        try {
            await axios.post('http://localhost:3000/api/create-post', data, {
                headers: { Authorization: `Bearer ${token}` },
            });
            window.location.reload();
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    const handleDeletePost = async (postId) => {
        const token = localStorage.getItem('jwt');
        try {
            await axios.delete(`http://localhost:3000/api/delete-post/${postId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            window.location.reload();
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    // Role Handlers
    const handleCreateRole = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        const token = localStorage.getItem('jwt');
        try {
            await axios.post('http://localhost:3000/api/create-role', data, {
                headers: { Authorization: `Bearer ${token}` },
            });
            window.location.reload();
        } catch (error) {
            console.error('Error creating role:', error);
        }
    };

    // User Handlers
    const handleCreateUser = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        const token = localStorage.getItem('jwt');
        try {
            await axios.post('http://localhost:3000/api/create-user', data, {
                headers: { Authorization: `Bearer ${token}` },
            });
            window.location.reload();
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    const handleDeleteUser = async (userId) => {
        const token = localStorage.getItem('jwt');
        try {
            await axios.delete(`http://localhost:3000/api/delete-user/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            window.location.reload();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div className="container">
            <header className="admin-header">
                <h1 className="admin-title">Admin Dashboard</h1>
                <div className="user-info">
                    Welcome, {localStorage.getItem('userName')} | Role: Admin
                    <a href="/login" className="logout-link" onClick={() => localStorage.removeItem('jwt')}>
                        Logout
                    </a>
                </div>
            </header>

            <div className="tabs">
                <div className={`tab ${activeTab === 'banner-ads' ? 'active' : ''}`} onClick={() => setActiveTab('banner-ads')}>
                    Banner Ads
                </div>
                <div className={`tab ${activeTab === 'carousel-banners' ? 'active' : ''}`} onClick={() => setActiveTab('carousel-banners')}>
                    Carousel Banners
                </div>
                <div className={`tab ${activeTab === 'categories' ? 'active' : ''}`} onClick={() => setActiveTab('categories')}>
                    Categories
                </div>
                <div className={`tab ${activeTab === 'posts' ? 'active' : ''}`} onClick={() => setActiveTab('posts')}>
                    Posts
                </div>
                <div className={`tab ${activeTab === 'roles' ? 'active' : ''}`} onClick={() => setActiveTab('roles')}>
                    Roles
                </div>
                <div className={`tab ${activeTab === 'users' ? 'active' : ''}`} onClick={() => setActiveTab('users')}>
                    Users
                </div>
            </div>

            {/* Banner Ads Tab */}
            {activeTab === 'banner-ads' && (
                <div className="tab-content active">
                    <div className="section">
                        <h2 className="section-title">Create a New Banner Ad</h2>
                        <form onSubmit={handleCreateBannerAd}>
                            <div className="form-group">
                                <label htmlFor="banner-ad-title">Title</label>
                                <input type="text" id="banner-ad-title" name="title" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="banner-ad-imageUrl">Image URL</label>
                                <input type="url" id="banner-ad-imageUrl" name="imageUrl" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="banner-ad-redirectUrl">Redirect URL</label>
                                <input type="url" id="banner-ad-redirectUrl" name="redirectUrl" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="banner-ad-startDate">Start Date</label>
                                <input type="date" id="banner-ad-startDate" name="startDate" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="banner-ad-endDate">End Date</label>
                                <input type="date" id="banner-ad-endDate" name="endDate" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="banner-ad-isActive">Is Active</label>
                                <select id="banner-ad-isActive" name="isActive" required>
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <button type="submit" className="submit-button">Create Banner Ad</button>
                        </form>
                    </div>
                    <div className="section">
                        <h2 className="section-title">Manage Banner Ads</h2>
                        <table className="entity-table">
                            <thead>
                            <tr>
                                <th>Title</th>
                                <th>Image URL</th>
                                <th>Redirect URL</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Is Active</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {bannerAds.map(banner => (
                                <tr key={banner.bannerId}>
                                    <td>{banner.title}</td>
                                    <td><a href={banner.imageUrl} target="_blank">View Image</a></td>
                                    <td><a href={banner.redirectUrl} target="_blank">Link</a></td>
                                    <td>{new Date(banner.startDate).toLocaleDateString()}</td>
                                    <td>{new Date(banner.endDate).toLocaleDateString()}</td>
                                    <td>{banner.isActive ? 'Yes' : 'No'}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <button className="edit-button">Edit</button>
                                            <button className="delete-button" onClick={() => handleDeleteBannerAd(banner.bannerId)}>
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Carousel Banners Tab */}
            {activeTab === 'carousel-banners' && (
                <div className="tab-content active">
                    <div className="section">
                        <h2 className="section-title">Create a New Carousel Banner</h2>
                        <form onSubmit={handleCreateCarouselBanner}>
                            <div className="form-group">
                                <label htmlFor="carousel-banner-title">Title</label>
                                <input type="text" id="carousel-banner-title" name="title" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="carousel-banner-imageUrl">Image URL</label>
                                <input type="url" id="carousel-banner-imageUrl" name="imageUrl" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="carousel-banner-description">Description</label>
                                <textarea id="carousel-banner-description" name="description" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="carousel-banner-displayOrder">Display Order</label>
                                <input type="number" id="carousel-banner-displayOrder" name="displayOrder" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="carousel-banner-redirectUrl">Redirect URL</label>
                                <input type="url" id="carousel-banner-redirectUrl" name="redirectUrl" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="carousel-banner-isActive">Is Active</label>
                                <select id="carousel-banner-isActive" name="isActive" required>
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <button type="submit" className="submit-button">Create Carousel Banner</button>
                        </form>
                    </div>
                    <div className="section">
                        <h2 className="section-title">Manage Carousel Banners</h2>
                        <table className="entity-table">
                            <thead>
                            <tr>
                                <th>Title</th>
                                <th>Image URL</th>
                                <th>Description</th>
                                <th>Display Order</th>
                                <th>Redirect URL</th>
                                <th>Is Active</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {carouselBanners.map(banner => (
                                <tr key={banner.carouselId}>
                                    <td>{banner.title}</td>
                                    <td><a href={banner.imageUrl} target="_blank">View Image</a></td>
                                    <td>{banner.description}</td>
                                    <td>{banner.displayOrder}</td>
                                    <td><a href={banner.redirectUrl} target="_blank">Link</a></td>
                                    <td>{banner.isActive ? 'Yes' : 'No'}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <button className="edit-button">Edit</button>
                                            <button className="delete-button" onClick={() => handleDeleteCarouselBanner(banner.carouselId)}>
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Categories Tab */}
            {activeTab === 'categories' && (
                <div className="tab-content active">
                    <div className="section">
                        <h2 className="section-title">Create a New Category</h2>
                        <form onSubmit={handleCreateCategory}>
                            <div className="form-group">
                                <label htmlFor="category-name">Name</label>
                                <input type="text" id="category-name" name="name" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="category-description">Description</label>
                                <textarea id="category-description" name="description" required />
                            </div>
                            <button type="submit" className="submit-button">Create Category</button>
                        </form>
                    </div>
                    <div className="section">
                        <h2 className="section-title">Manage Categories</h2>
                        <table className="entity-table">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {categories.map(category => (
                                <tr key={category.categoryId}>
                                    <td>{category.name}</td>
                                    <td>{category.description}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <button className="edit-button">Edit</button>
                                            <button className="delete-button" onClick={() => handleDeleteCategory(category.categoryId)}>
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Posts Tab */}
            {activeTab === 'posts' && (
                <div className="tab-content active">
                    <div className="section">
                        <h2 className="section-title">Create a New Post</h2>
                        <form onSubmit={handleCreatePost}>
                            <div className="form-group">
                                <label htmlFor="post-title">Title</label>
                                <input type="text" id="post-title" name="title" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="post-content">Content</label>
                                <textarea id="post-content" name="content" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="post-imageUrl">Image URL</label>
                                <input type="url" id="post-imageUrl" name="imageUrl" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="post-categoryId">Category</label>
                                <select id="post-categoryId" name="categoryId" required>
                                    {categories.map(category => (
                                        <option key={category.categoryId} value={category.categoryId}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="post-isPublished">Is Published</label>
                                <select id="post-isPublished" name="isPublished" required>
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <button type="submit" className="submit-button">Create Post</button>
                        </form>
                    </div>
                    <div className="section">
                        <h2 className="section-title">Manage Posts</h2>
                        <table className="entity-table">
                            <thead>
                            <tr>
                                <th>Title</th>
                                <th>Content</th>
                                <th>Image URL</th>
                                <th>Category</th>
                                <th>Is Published</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {posts.map(post => (
                                <tr key={post.postId}>
                                    <td>{post.title}</td>
                                    <td>{post.content.substring(0, 50)}...</td>
                                    <td><a href={post.imageUrl} target="_blank">View Image</a></td>
                                    <td>{categories.find(cat => cat.categoryId === post.categoryId)?.name || 'N/A'}</td>
                                    <td>{post.isPublished ? 'Yes' : 'No'}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <button className="edit-button">Edit</button>
                                            <button className="delete-button" onClick={() => handleDeletePost(post.postId)}>
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Roles Tab */}
            {activeTab === 'roles' && (
                <div className="tab-content active">
                    <div className="section">
                        <h2 className="section-title">Create a New Role</h2>
                        <form onSubmit={handleCreateRole}>
                            <div className="form-group">
                                <label htmlFor="role-name">Name</label>
                                <input type="text" id="role-name" name="name" required />
                            </div>
                            <button type="submit" className="submit-button">Create Role</button>
                        </form>
                    </div>
                    <div className="section">
                        <h2 className="section-title">Manage Roles</h2>
                        <table className="entity-table">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {roles.map(role => (
                                <tr key={role.roleId}>
                                    <td>{role.name}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <button className="edit-button">Edit</button>
                                            {/* Note: Add delete functionality if your API supports it */}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
                <div className="tab-content active">
                    <div className="section">
                        <h2 className="section-title">Create a New User</h2>
                        <form onSubmit={handleCreateUser}>
                            <div className="form-group">
                                <label htmlFor="user-firstname">First Name</label>
                                <input type="text" id="user-firstname" name="firstname" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="user-lastname">Last Name</label>
                                <input type="text" id="user-lastname" name="lastname" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="user-email">Email</label>
                                <input type="email" id="user-email" name="email" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="user-password">Password</label>
                                <input type="password" id="user-password" name="password" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="user-address">Address</label>
                                <input type="text" id="user-address" name="address" required />
                            </div>
                            <button type="submit" className="submit-button">Create User</button>
                        </form>
                    </div>
                    <div className="section">
                        <h2 className="section-title">Manage Users</h2>
                        <table className="entity-table">
                            <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {users.map(user => (
                                <tr key={user.userId}>
                                    <td>{user.firstname}</td>
                                    <td>{user.lastname}</td>
                                    <td>{user.email}</td>
                                    <td>{user.address}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <button className="edit-button">Edit</button>
                                            <button className="delete-button" onClick={() => handleDeleteUser(user.userId)}>
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;