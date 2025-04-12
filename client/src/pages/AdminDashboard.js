import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import API_BASE_URL from '../config';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('banner-ads');
    const [bannerAds, setBannerAds] = useState([]);
    const [carouselBanners, setCarouselBanners] = useState([]);
    const [categories, setCategories] = useState([]);
    const [posts, setPosts] = useState([]);
    const [roles, setRoles] = useState([]);
    const [users, setUsers] = useState([]);
    const [editingEntity, setEditingEntity] = useState(null);
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
                    axios.get(`${API_BASE_URL}/api/BannerAd/GetAllBannerAds`, { headers }),
                    axios.get(`${API_BASE_URL}/api/CarouselBanner/GetAllCarouselBanners`, { headers }),
                    axios.get(`${API_BASE_URL}/api/Category/GetAllCategories`, { headers }),
                    axios.get(`${API_BASE_URL}/api/Post/GetAllPosts`, { headers }),
                    axios.get(`${API_BASE_URL}/api/Role/GetAllRoles`, { headers }),
                    axios.get(`${API_BASE_URL}/api/User/GetAllUsers`, { headers }),
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
            await axios.post(`${API_BASE_URL}/api/BannerAd/CreateBannerAd`, data, {
                headers: { Authorization: `Bearer ${token}` },
            });
            window.location.reload();
        } catch (error) {
            console.error('Error creating banner ad:', error);
        }
    };

    const handleUpdateBannerAd = async (e, bannerId) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        data.bannerId = bannerId;
        data.isActive = data.isActive === 'true';
        const token = localStorage.getItem('jwt');
        try {
            await axios.put(`${API_BASE_URL}/api/BannerAd/UpdateBannerAd`, data, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setEditingEntity(null);
            window.location.reload();
        } catch (error) {
            console.error('Error updating banner ad:', error);
        }
    };

    const handleDeleteBannerAd = async (bannerId) => {
        const confirmed = window.confirm('Are you sure you want to delete this banner ad? This action cannot be undone.');
        if (!confirmed) return;

        const token = localStorage.getItem('jwt');
        try {
            await axios.delete(`${API_BASE_URL}/api/BannerAd/DeleteBannerAd`, {
                headers: { Authorization: `Bearer ${token}` },
                data: { bannerId },
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
            await axios.post(`${API_BASE_URL}/api/CarouselBanner/CreateCarouselBanner`, data, {
                headers: { Authorization: `Bearer ${token}` },
            });
            window.location.reload();
        } catch (error) {
            console.error('Error creating carousel banner:', error);
        }
    };

    const handleUpdateCarouselBanner = async (e, carouselId) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        data.carouselId = carouselId;
        data.displayOrder = parseInt(data.displayOrder);
        data.isActive = data.isActive === 'true';
        const token = localStorage.getItem('jwt');
        try {
            await axios.put(`${API_BASE_URL}/api/CarouselBanner/UpdateCarouselBanner`, data, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setEditingEntity(null);
            window.location.reload();
        } catch (error) {
            console.error('Error updating carousel banner:', error);
        }
    };

    const handleDeleteCarouselBanner = async (carouselId) => {
        const confirmed = window.confirm('Are you sure you want to delete this carousel banner? This action cannot be undone.');
        if (!confirmed) return;

        const token = localStorage.getItem('jwt');
        try {
            await axios.delete(`${API_BASE_URL}/api/CarouselBanner/DeleteCarouselBanner`, {
                headers: { Authorization: `Bearer ${token}` },
                data: { carouselId },
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
            await axios.post(`${API_BASE_URL}/api/Category/CreateCategory`, data, {
                headers: { Authorization: `Bearer ${token}` },
            });
            window.location.reload();
        } catch (error) {
            console.error('Error creating category:', error);
        }
    };

    const handleUpdateCategory = async (e, categoryId) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        data.categoryId = categoryId;
        const token = localStorage.getItem('jwt');
        try {
            await axios.put(`${API_BASE_URL}/api/Category/UpdateCategory`, data, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setEditingEntity(null);
            window.location.reload();
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };

    const handleDeleteCategory = async (categoryId) => {
        const confirmed = window.confirm('Are you sure you want to delete this category? This action cannot be undone.');
        if (!confirmed) return;

        const token = localStorage.getItem('jwt');
        try {
            await axios.delete(`${API_BASE_URL}/api/Category/DeleteCategory`, {
                headers: { Authorization: `Bearer ${token}` },
                data: { categoryId },
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
            await axios.post(`${API_BASE_URL}/api/Post/CreatePost`, data, {
                headers: { Authorization: `Bearer ${token}` },
            });
            window.location.reload();
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    const handleUpdatePost = async (e, postId) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        data.postId = postId;
        data.isPublished = data.isPublished === 'true';
        const token = localStorage.getItem('jwt');
        try {
            await axios.put(`${API_BASE_URL}/api/Post/UpdatePost`, data, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setEditingEntity(null);
            window.location.reload();
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };

    const handleDeletePost = async (postId) => {
        const confirmed = window.confirm('Are you sure you want to delete this post? This action cannot be undone.');
        if (!confirmed) return;

        const token = localStorage.getItem('jwt');
        try {
            await axios.delete(`${API_BASE_URL}/api/Post/DeletePost`, {
                headers: { Authorization: `Bearer ${token}` },
                data: { postId },
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
            await axios.post(`${API_BASE_URL}/api/Role/CreateRole`, data, {
                headers: { Authorization: `Bearer ${token}` },
            });
            window.location.reload();
        } catch (error) {
            console.error('Error creating role:', error);
        }
    };

    const handleUpdateRole = async (e, roleId) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        data.roleId = roleId;
        const token = localStorage.getItem('jwt');
        try {
            await axios.put(`${API_BASE_URL}/api/Role/UpdateRole`, data, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setEditingEntity(null);
            window.location.reload();
        } catch (error) {
            console.error('Error updating role:', error);
        }
    };

    // User Handlers
    const handleCreateUser = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        const token = localStorage.getItem('jwt');
        try {
            await axios.post(`${API_BASE_URL}/api/User/CreateUser`, data, {
                headers: { Authorization: `Bearer ${token}` },
            });
            window.location.reload();
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    const handleUpdateUser = async (e, userId) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        data.userId = userId;
        const token = localStorage.getItem('jwt');
        try {
            await axios.put(`${API_BASE_URL}/api/User/UpdateUser`, data, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setEditingEntity(null);
            window.location.reload();
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleDeleteUser = async (userId) => {
        const confirmed = window.confirm('Are you sure you want to delete this user? This action cannot be undone.');
        if (!confirmed) return;

        const token = localStorage.getItem('jwt');
        try {
            await axios.delete(`${API_BASE_URL}/api/User/DeleteUser`, {
                headers: { Authorization: `Bearer ${token}` },
                data: { userId },
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
                    <a href="/" className="logout-link">
                        Goto Blog Homepage
                    </a>
                </div>
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
                        <h2 className="section-title">
                            {editingEntity?.type === 'banner' ? 'Edit Banner Ad' : 'Create a New Banner Ad'}
                        </h2>
                        <form onSubmit={(e) => editingEntity?.type === 'banner' ? handleUpdateBannerAd(e, editingEntity.id) : handleCreateBannerAd(e)}>
                            <div className="form-group">
                                <label htmlFor="banner-ad-title">Title</label>
                                <input
                                    type="text"
                                    id="banner-ad-title"
                                    name="title"
                                    defaultValue={editingEntity?.type === 'banner' ? editingEntity.data.title : ''}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="banner-ad-imageUrl">Image URL</label>
                                <input
                                    type="url"
                                    id="banner-ad-imageUrl"
                                    name="imageUrl"
                                    defaultValue={editingEntity?.type === 'banner' ? editingEntity.data.imageUrl : ''}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="banner-ad-redirectUrl">Redirect URL</label>
                                <input
                                    type="url"
                                    id="banner-ad-redirectUrl"
                                    name="redirectUrl"
                                    defaultValue={editingEntity?.type === 'banner' ? editingEntity.data.redirectUrl : ''}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="banner-ad-startDate">Start Date</label>
                                <input
                                    type="date"
                                    id="banner-ad-startDate"
                                    name="startDate"
                                    defaultValue={editingEntity?.type === 'banner' ? editingEntity.data.startDate.split('T')[0] : ''}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="banner-ad-endDate">End Date</label>
                                <input
                                    type="date"
                                    id="banner-ad-endDate"
                                    name="endDate"
                                    defaultValue={editingEntity?.type === 'banner' ? editingEntity.data.endDate.split('T')[0] : ''}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="banner-ad-isActive">Is Active</label>
                                <select
                                    id="banner-ad-isActive"
                                    name="isActive"
                                    defaultValue={editingEntity?.type === 'banner' ? editingEntity.data.isActive.toString() : 'true'}
                                    required
                                >
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <button type="submit" className="submit-button">
                                {editingEntity?.type === 'banner' ? 'Update Banner Ad' : 'Create Banner Ad'}
                            </button>
                            {editingEntity?.type === 'banner' && (
                                <button
                                    type="button"
                                    className="submit-button"
                                    style={{ backgroundColor: '#e74c3c', marginLeft: '10px' }}
                                    onClick={() => setEditingEntity(null)}
                                >
                                    Cancel
                                </button>
                            )}
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
                                            <button
                                                className="edit-button"
                                                onClick={() => setEditingEntity({ type: 'banner', id: banner.bannerId, data: banner })}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="delete-button"
                                                onClick={() => handleDeleteBannerAd(banner.bannerId)}
                                            >
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
                        <h2 className="section-title">
                            {editingEntity?.type === 'carousel' ? 'Edit Carousel Banner' : 'Create a New Carousel Banner'}
                        </h2>
                        <form onSubmit={(e) => editingEntity?.type === 'carousel' ? handleUpdateCarouselBanner(e, editingEntity.id) : handleCreateCarouselBanner(e)}>
                            <div className="form-group">
                                <label htmlFor="carousel-banner-title">Title</label>
                                <input
                                    type="text"
                                    id="carousel-banner-title"
                                    name="title"
                                    defaultValue={editingEntity?.type === 'carousel' ? editingEntity.data.title : ''}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="carousel-banner-imageUrl">Image URL</label>
                                <input
                                    type="url"
                                    id="carousel-banner-imageUrl"
                                    name="imageUrl"
                                    defaultValue={editingEntity?.type === 'carousel' ? editingEntity.data.imageUrl : ''}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="carousel-banner-description">Description</label>
                                <textarea
                                    id="carousel-banner-description"
                                    name="description"
                                    defaultValue={editingEntity?.type === 'carousel' ? editingEntity.data.description : ''}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="carousel-banner-displayOrder">Display Order</label>
                                <input
                                    type="number"
                                    id="carousel-banner-displayOrder"
                                    name="displayOrder"
                                    defaultValue={editingEntity?.type === 'carousel' ? editingEntity.data.displayOrder : ''}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="carousel-banner-redirectUrl">Redirect URL</label>
                                <input
                                    type="url"
                                    id="carousel-banner-redirectUrl"
                                    name="redirectUrl"
                                    defaultValue={editingEntity?.type === 'carousel' ? editingEntity.data.redirectUrl : ''}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="carousel-banner-isActive">Is Active</label>
                                <select
                                    id="carousel-banner-isActive"
                                    name="isActive"
                                    defaultValue={editingEntity?.type === 'carousel' ? editingEntity.data.isActive.toString() : 'true'}
                                    required
                                >
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <button type="submit" className="submit-button">
                                {editingEntity?.type === 'carousel' ? 'Update Carousel Banner' : 'Create Carousel Banner'}
                            </button>
                            {editingEntity?.type === 'carousel' && (
                                <button
                                    type="button"
                                    className="submit-button"
                                    style={{ backgroundColor: '#e74c3c', marginLeft: '10px' }}
                                    onClick={() => setEditingEntity(null)}
                                >
                                    Cancel
                                </button>
                            )}
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
                                            <button
                                                className="edit-button"
                                                onClick={() => setEditingEntity({ type: 'carousel', id: banner.carouselId, data: banner })}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="delete-button"
                                                onClick={() => handleDeleteCarouselBanner(banner.carouselId)}
                                            >
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
                        <h2 className="section-title">
                            {editingEntity?.type === 'category' ? 'Edit Category' : 'Create a New Category'}
                        </h2>
                        <form onSubmit={(e) => editingEntity?.type === 'category' ? handleUpdateCategory(e, editingEntity.id) : handleCreateCategory(e)}>
                            <div className="form-group">
                                <label htmlFor="category-name">Name</label>
                                <input
                                    type="text"
                                    id="category-name"
                                    name="name"
                                    defaultValue={editingEntity?.type === 'category' ? editingEntity.data.name : ''}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="category-description">Description</label>
                                <textarea
                                    id="category-description"
                                    name="description"
                                    defaultValue={editingEntity?.type === 'category' ? editingEntity.data.description : ''}
                                    required
                                />
                            </div>
                            <button type="submit" className="submit-button">
                                {editingEntity?.type === 'category' ? 'Update Category' : 'Create Category'}
                            </button>
                            {editingEntity?.type === 'category' && (
                                <button
                                    type="button"
                                    className="submit-button"
                                    style={{ backgroundColor: '#e74c3c', marginLeft: '10px' }}
                                    onClick={() => setEditingEntity(null)}
                                >
                                    Cancel
                                </button>
                            )}
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
                                            <button
                                                className="edit-button"
                                                onClick={() => setEditingEntity({ type: 'category', id: category.categoryId, data: category })}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="delete-button"
                                                onClick={() => handleDeleteCategory(category.categoryId)}
                                            >
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
                        <h2 className="section-title">
                            {editingEntity?.type === 'post' ? 'Edit Post' : 'Create a New Post'}
                        </h2>
                        <form onSubmit={(e) => editingEntity?.type === 'post' ? handleUpdatePost(e, editingEntity.id) : handleCreatePost(e)}>
                            <div className="form-group">
                                <label htmlFor="post-title">Title</label>
                                <input
                                    type="text"
                                    id="post-title"
                                    name="title"
                                    defaultValue={editingEntity?.type === 'post' ? editingEntity.data.title : ''}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="post-content">Content</label>
                                <textarea
                                    id="post-content"
                                    name="content"
                                    defaultValue={editingEntity?.type === 'post' ? editingEntity.data.content : ''}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="post-imageUrl">Image URL</label>
                                <input
                                    type="url"
                                    id="post-imageUrl"
                                    name="imageUrl"
                                    defaultValue={editingEntity?.type === 'post' ? editingEntity.data.imageUrl : ''}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="post-categoryId">Category</label>
                                <select
                                    id="post-categoryId"
                                    name="categoryId"
                                    defaultValue={editingEntity?.type === 'post' ? editingEntity.data.categoryId : ''}
                                    required
                                >
                                    {categories.map(category => (
                                        <option key={category.categoryId} value={category.categoryId}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="post-isPublished">Is Published</label>
                                <select
                                    id="post-isPublished"
                                    name="isPublished"
                                    defaultValue={editingEntity?.type === 'post' ? editingEntity.data.isPublished.toString() : 'true'}
                                    required
                                >
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <button type="submit" className="submit-button">
                                {editingEntity?.type === 'post' ? 'Update Post' : 'Create Post'}
                            </button>
                            {editingEntity?.type === 'post' && (
                                <button
                                    type="button"
                                    className="submit-button"
                                    style={{ backgroundColor: '#e74c3c', marginLeft: '10px' }}
                                    onClick={() => setEditingEntity(null)}
                                >
                                    Cancel
                                </button>
                            )}
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
                                            <button
                                                className="edit-button"
                                                onClick={() => setEditingEntity({ type: 'post', id: post.postId, data: post })}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="delete-button"
                                                onClick={() => handleDeletePost(post.postId)}
                                            >
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
                        <h2 className="section-title">
                            {editingEntity?.type === 'role' ? 'Edit Role' : 'Create a New Role'}
                        </h2>
                        <form onSubmit={(e) => editingEntity?.type === 'role' ? handleUpdateRole(e, editingEntity.id) : handleCreateRole(e)}>
                            <div className="form-group">
                                <label htmlFor="role-name">Name</label>
                                <input
                                    type="text"
                                    id="role-name"
                                    name="name"
                                    defaultValue={editingEntity?.type === 'role' ? editingEntity.data.name : ''}
                                    required
                                />
                            </div>
                            <button type="submit" className="submit-button">
                                {editingEntity?.type === 'role' ? 'Update Role' : 'Create Role'}
                            </button>
                            {editingEntity?.type === 'role' && (
                                <button
                                    type="button"
                                    className="submit-button"
                                    style={{ backgroundColor: '#e74c3c', marginLeft: '10px' }}
                                    onClick={() => setEditingEntity(null)}
                                >
                                    Cancel
                                </button>
                            )}
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
                                            <button
                                                className="edit-button"
                                                onClick={() => setEditingEntity({ type: 'role', id: role.roleId, data: role })}
                                            >
                                                Edit
                                            </button>
                                            {/* No delete endpoint for roles */}
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
                        <h2 className="section-title">
                            {editingEntity?.type === 'user' ? 'Edit User' : 'Create a New User'}
                        </h2>
                        <form onSubmit={(e) => editingEntity?.type === 'user' ? handleUpdateUser(e, editingEntity.id) : handleCreateUser(e)}>
                            <div className="form-group">
                                <label htmlFor="user-firstname">First Name</label>
                                <input
                                    type="text"
                                    id="user-firstname"
                                    name="firstname"
                                    defaultValue={editingEntity?.type === 'user' ? editingEntity.data.firstname : ''}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="user-lastname">Last Name</label>
                                <input
                                    type="text"
                                    id="user-lastname"
                                    name="lastname"
                                    defaultValue={editingEntity?.type === 'user' ? editingEntity.data.lastname : ''}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="user-email">Email</label>
                                <input
                                    type="email"
                                    id="user-email"
                                    name="email"
                                    defaultValue={editingEntity?.type === 'user' ? editingEntity.data.email : ''}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="user-password">
                                    {editingEntity?.type === 'user' ? 'Password (leave blank to keep unchanged)' : 'Password'}
                                </label>
                                <input
                                    type="password"
                                    id="user-password"
                                    name="password"
                                    required={editingEntity?.type !== 'user'}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="user-address">Address</label>
                                <input
                                    type="text"
                                    id="user-address"
                                    name="address"
                                    defaultValue={editingEntity?.type === 'user' ? editingEntity.data.address : ''}
                                    required
                                />
                            </div>
                            <button type="submit" className="submit-button">
                                {editingEntity?.type === 'user' ? 'Update User' : 'Create User'}
                            </button>
                            {editingEntity?.type === 'user' && (
                                <button
                                    type="button"
                                    className="submit-button"
                                    style={{ backgroundColor: '#e74c3c', marginLeft: '10px' }}
                                    onClick={() => setEditingEntity(null)}
                                >
                                    Cancel
                                </button>
                            )}
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
                                            <button
                                                className="edit-button"
                                                onClick={() => setEditingEntity({ type: 'user', id: user.userId, data: user })}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="delete-button"
                                                onClick={() => handleDeleteUser(user.userId)}
                                            >
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