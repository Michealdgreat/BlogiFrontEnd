# MyBlogi Frontend

This is the React frontend for the **MyBlogi** blogging platform — a web application that allows users to browse articles, view featured content, and manage blog content through an admin dashboard. The frontend communicates with a .NET backend API to manage posts, ads, banners, categories, roles, and users.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Available Scripts](#available-scripts)
- [Dependencies](#dependencies)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

---

## Project Overview

The MyBlogi frontend is built with **React** and serves as the UI for the blogging platform. It includes:

- A **public-facing section** to browse content
- An **admin dashboard** for managing blog data
- **JWT-based authentication**
- Communication with a **.NET backend API** (`http://localhost:5115` by default)

Core libraries and tools include **React Router**, **Axios**, and **React Slick**.

---

## Features

- **Homepage**  
  Carousel banners, featured posts, latest promotions, and recent articles.

- **Articles Page**  
  Displays all published articles in a grid layout. Each includes a “Read More” link.

- **Post Page**  
  Full content of a selected article with title, image, and timestamp.

- **Admin Dashboard**  
  CRUD operations for:
    - Banner Ads
    - Carousel Banners
    - Categories
    - Posts
    - Roles
    - Users

- **Authentication**  
  JWT-based admin login with token storage in `localStorage`.

- **Extras**
    - Skeleton loaders
    - Responsive design
    - Delete confirmations in the dashboard

---

## Prerequisites

Make sure the following are installed:

- **Node.js** (v14.x or higher)
- **npm** (v6.x or higher) 
- A running instance of the MyBlogi backend API (`http://localhost:5115`)

---

## Installation

1. **Clone the repository**:

   ```bash
   open cloned repository path in terminal or cmd 
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment configuration**:  
   Create `src/config.js` if it doesn't exist:

   ```js
   const API_BASE_URL = 'http://localhost:5115'; // Update as needed
   export default API_BASE_URL;
   ```

4. **Start the development server**:

   ```bash
   npm start
   ```

   The app will be available at [http://localhost:3000](http://localhost:3000).

---

## Usage

- **Homepage**:  
  Visit `/` to view featured banners, promotions, recent articles, and more.

- **Articles**:  
  Navigate to `/articles` to browse all articles. Click “Read More” to view details.

- **Admin Login**:  
  Visit `/login` to sign in as an admin. After logging in, you will be redirected to `/admin`.

- **Admin Dashboard**:  
  Use the tabs to manage content (ads, categories, users, etc.).

- **Logout**:  
  Use the "Logout" button to clear the token and return to the login page.

---

## Folder Structure

```plaintext
myBlogiFrontend/client/
├── public/
│   ├── index.html           
│   ├── favicon.ico
│   └── *.svg             
├── src/
│   ├── pages/
│   │   ├── Homepage.js
│   │   ├── Articles.js
│   │   ├── PostPage.js
│   │   ├── Login.js
│   │   └── AdminDashboard.js
│   ├── config.js            
│   ├── styles.css          
│   └── App.js              
├── package.json
└── README.md
```

---

## Available Scripts

Inside the project directory:

| Script        | Description                          |
| ------------- | ------------------------------------ |
| `npm start`   | Runs the app in development mode     |
| `npm build`   | Builds the app for production        |

---

## Dependencies

Core libraries used:

- `react` — UI library
- `react-router-dom` — Routing
- `axios` — HTTP client
- `react-slick`, `slick-carousel` — Carousel UI
- `jwt-decode` — JWT decoding
- `memo` — React performance optimization

To view the full list, see `package.json`.

---

## Environment Variables

The app uses a simple config file for the API base URL.

### Option 1: `config.js` (default)

```js
const API_BASE_URL = 'http://localhost:5115';
export default API_BASE_URL;
```

### Option 2: `.env` file

```env
REACT_APP_API_BASE_URL=http://localhost:5115
```

Then update `config.js`:

```js
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5115';
export default API_BASE_URL;
```

---

## Contributing

Contributions are welcome! Here's how to contribute:

1. Fork the repo
2. Create a feature branch:

   ```bash
   git checkout -b feature/your-feature
   ```

3. Commit your changes:

   ```bash
   git commit -m "Add your feature"
   ```

4. Push to your branch:

   ```bash
   git push origin feature/your-feature
   ```

5. Open a Pull Request with a clear description

Please follow the existing code style and add comments where necessary.

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](./LICENSE) file for details.

---

Let me know if you'd like a version with markdown badges, screenshots, or setup for deployment (e.g., with Netlify or Vercel)!