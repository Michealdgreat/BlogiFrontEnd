# MyBlogi

MyBlogi is a full-stack blog application built with a React frontend and a .NET backend. It allows users to browse blog posts, view carousel banners, and see banner ads on the homepage, while providing an admin dashboard for managing content. The application is designed to be modern, responsive, and fully dynamic, with all content fetched from the API.

## Features

- **Homepage**:
    - Dynamically fetches and displays a carousel of active banners, horizontal banner ads, a grid of recent posts, a featured post, and social media links (if an API endpoint is available).
    - Carousel at the top using `react-slick` to showcase active carousel banners.
    - Horizontal scrollable banner ads section displaying active ads within the date range.
    - Grid of 3 recent published posts with images, titles, descriptions, dates, and "Read more" links.
    - Featured post section at the bottom, showcasing the most recent post with a large image, title, description, date, and "Read more" link.
    - Navigation bar with logo, search bar, "Home" and "Articles" links, and social media icons.
    - Footer with logo, copyright notice, and social media icons.

- **Admin Dashboard**:
    - Full CRUD operations for Banner Ads, Carousel Banners, Categories, Posts, and Users.
    - Create and Update operations for Roles (Delete not supported by the API).
    - Tabs remain active after Create, Update, or Delete operations until manually changed.
    - Styled with a modern, responsive design.

- **Authentication**:
    - JWT-based authentication for admin access.
    - Login page with a modern, responsive design.

- **API Integration**:
    - All content on the homepage is fetched from the backend API, with no static fallbacks.
    - Endpoints used:
        - `/api/CarouselBanner/GetAllCarouselBanners` for carousel banners.
        - `/api/Post/GetAllPosts` for posts.
        - `/api/BannerAd/GetAllBannerAds` for banner ads.

- **Responsive Design**:
    - The homepage and admin dashboard are fully responsive, adapting to various screen sizes.

## Tech Stack

- **Frontend**:
    - React (v18.x)
    - Axios for API requests
    - `react-slick` for the carousel
    - CSS for styling
    - React Router for navigation

- **Backend**:
    - .NET (ASP.NET Core)
    - Entity Framework Core for database access
    - SQL Server (or another database, depending on your setup)
    - JWT for authentication

- **Development Tools**:
    - Node.js and npm for frontend dependencies
    - Visual Studio or Rider for backend development
    - Postman for API testing

## Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js** (v16.x or later) and npm
- **.NET SDK** (v6.0 or later)
- **SQL Server** (or another database supported by your backend)
- A code editor like Visual Studio Code, Visual Studio, or Rider

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/myblogi.git
cd myblogi
```

### 2. Backend Setup

1. **Navigate to the Backend Directory**:
   ```bash
   cd backend
   ```

2. **Configure the Database**:
    - Update the connection string in `appsettings.json` to point to your SQL Server instance:
      ```json
      "ConnectionStrings":{
        "DefaultConnection": "Server=localhost;Database=MyBlogiDb;Trusted_Connection=True;"
      }
      ```
    - Run the database migrations to create the database and tables:
      ```bash
      dotnet ef database update
      ```

3. **Run the Backend**:
   ```bash
   dotnet run
   ```
    - The backend should start on `http://localhost:5115` (or another port, depending on your configuration).
    - Test the API endpoints using Postman (e.g., `http://localhost:5115/api/CarouselBanner/GetAllCarouselBanners`).

### 3. Frontend Setup

1. **Navigate to the Frontend Directory**:
   ```bash
   cd ../client
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure the API Base URL**:
    - Update `src/config.js` with the correct backend API URL:
      ```javascript
      const API_BASE_URL = 'http://localhost:5115';
      export default API_BASE_URL;
      ```

4. **Run the Frontend**:
   ```bash
   npm start
   ```
    - The frontend should start on `http://localhost:3000`.

### 4. Test the Application

- Open `http://localhost:3000` in your browser to view the homepage.
- Verify that the carousel, banner ads, post grid, and featured post sections are populated with data from the API.
- Log in to the admin dashboard (e.g., `http://localhost:3000/admin`) to manage content:
    - Default admin credentials (if applicable): Check your backend setup or database for initial user credentials.
    - Add carousel banners, banner ads, and posts to populate the homepage.

## API Endpoints

The following API endpoints are used in the application:

- **Carousel Banners**:
    - `GET /api/CarouselBanner/GetAllCarouselBanners`: Fetch all carousel banners.
    - `POST /api/CarouselBanner/CreateCarouselBanner`: Create a new carousel banner.
    - `PUT /api/CarouselBanner/UpdateCarouselBanner/{id}`: Update a carousel banner.
    - `DELETE /api/CarouselBanner/DeleteCarouselBanner/{id}`: Delete a carousel banner.

- **Banner Ads**:
    - `GET /api/BannerAd/GetAllBannerAds`: Fetch all banner ads.
    - `POST /api/BannerAd/CreateBannerAd`: Create a new banner ad.
    - `PUT /api/BannerAd/UpdateBannerAd/{id}`: Update a banner ad.
    - `DELETE /api/BannerAd/DeleteBannerAd/{id}`: Delete a banner ad.

- **Posts**:
    - `GET /api/Post/GetAllPosts`: Fetch all posts.
    - `POST /api/Post/CreatePost`: Create a new post.
    - `PUT /api/Post/UpdatePost/{id}`: Update a post.
    - `DELETE /api/Post/DeletePost/{id}`: Delete a post.

- **Categories**:
    - `GET /api/Category/GetAllCategories`: Fetch all categories.
    - `POST /api/Category/CreateCategory`: Create a new category.
    - `PUT /api/Category/UpdateCategory/{id}`: Update a category.
    - `DELETE /api/Category/DeleteCategory/{id}`: Delete a category.

- **Users**:
    - `GET /api/User/GetAllUsers`: Fetch all users.
    - `POST /api/User/CreateUser`: Create a new user.
    - `PUT /api/User/UpdateUser/{id}`: Update a user.
    - `DELETE /api/User/DeleteUser/{id}`: Delete a user.

- **Roles**:
    - `GET /api/Role/GetAllRoles`: Fetch all roles.
    - `POST /api/Role/CreateRole`: Create a new role.
    - `PUT /api/Role/UpdateRole/{id}`: Update a role.
    - (Delete not supported by the API.)

## Project Structure

```
myblogi/
├── backend/                    # .NET backend project
│   ├── Controllers/            # API controllers
│   ├── Models/                 # Data models
│   ├── Migrations/             # Database migrations
│   ├── appsettings.json        # Configuration file
│   └── Program.cs              # Entry point
├── client/                     # React frontend project
│   ├── src/
│   │   ├── pages/              # Page components (e.g., Homepage.js)
│   │   ├── components/         # Reusable components
│   │   ├── styles.css          # Global styles
│   │   ├── config.js           # API base URL configuration
│   │   └── App.js              # Main app component
│   ├── public/                 # Static assets (e.g., SVGs)
│   └── package.json            # Frontend dependencies
└── README.md                   # Project documentation
```

## Screenshots

### Homepage
![Homepage](screenshots/homepage.png)
*The homepage with a carousel, banner ads, post grid, and featured post.*

### Admin Dashboard
![Admin Dashboard](screenshots/admin-dashboard.png)
*The admin dashboard for managing content.*

### Login Page
![Login Page](screenshots/login.png)
*The login page for admin access.*

## Future Improvements

- **Dynamic Navigation and Footer**:
    - Add an API endpoint (e.g., `/api/SiteSettings/GetSettings`) to fetch site settings like the logo text, navigation links, copyright notice, and social media links.
    - Update the frontend to fetch and display this data dynamically.

- **Search Functionality**:
    - Implement search functionality for the search bar on the homepage, using an API endpoint like `/api/Post/SearchPosts`.

- **Post Detail Page**:
    - Create a dedicated post detail page to display the full content of a post when the "Read more" link is clicked.

- **Pagination for Posts**:
    - Add pagination to the post grid to load more posts as the user scrolls or clicks a "See more" button.

- **Improved Banner Ads**:
    - Add a carousel for banner ads if there are multiple ads, or randomize the displayed ad on each page load.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit them (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For questions or feedback, please contact [your-email@example.com](mailto:your-email@example.com).

---

### Notes for Customization
- **Screenshots**: Replace the placeholder screenshot paths (e.g., `screenshots/homepage.png`) with the actual paths to your screenshots once you’ve taken them.
- **Repository URL**: Update the `git clone` URL with your actual repository URL.
- **Email**: Replace `your-email@example.com` with your actual email address.
- **Database**: If you’re using a different database (e.g., PostgreSQL), update the connection string instructions accordingly.
- **Admin Credentials**: If your backend has default admin credentials, include them in the setup instructions or note where to find them.

This `README.md` provides a complete overview of your project, making it easy for others to understand, set up, and contribute to it. Let me know if you’d like to add or modify any sections!