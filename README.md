## Portfolio Website - Next.js

This is a **portfolio website** built using **Next.js Pages Router** that serves both the **frontend** and **backend** functionalities. The project integrates modern technologies to provide a seamless experience for users and an efficient admin interface for managing content. Below is an overview of the key features and technologies used.

## Key Features

### 1. Admin Panel with Full CRUD Functionality
The admin panel allows the authenticated user to **create**, **read**, **update**, and **delete** various sections of the portfolio including:
- **Projects**: Manage project listings with detailed information.
- **Blogs**: Add, edit, or remove blog posts.
- **FAQs**: Update frequently asked questions for users.
- **Skills**: Add and maintain the list of skills displayed on the portfolio.

All CRUD operations in the admin panel are implemented using an **optimistic approach**. This improves the user experience by immediately updating the UI to reflect changes without waiting for a server response.

### 2. Cursor-Based Pagination
For enhanced scalability and performance, the website implements **cursor-based pagination** for fetching projects, blogs, and other content, instead of the traditional offset-based pagination. This allows for more efficient data retrieval, especially when dealing with larger datasets.

### 3. TypeScript Integration
The project is fully written in **TypeScript**, ensuring type safety and better development practices. TypeScript enhances code maintainability and reduces potential runtime errors.

### 4. Authentication via NextAuth.js
**NextAuth.js** is used for **authentication**, enabling secure login for admin users. It supports multiple authentication providers, making the admin panel accessible only to authorized users.

### 5. Internationalization (i18n)
The application supports **multiple languages** using **next-intl** for internationalization. This ensures a broader reach for the website by allowing content to be displayed in different languages depending on the user's preferences.

### 6. SWR for Data Fetching
Data fetching throughout the website is handled using **SWR** (Stale-While-Revalidate). This provides fast, reactive data updates and ensures that the UI stays in sync with the backend in real-time.

### 7. Form Handling and Validation
Forms within the admin panel use:
- **React Hook Form**: For efficient form state management and submission handling.
- **Yup**: For **runtime validation**, ensuring that all inputs meet specified validation rules before submission.

### 8. Animations with Framer Motion
The website incorporates smooth **animations** using **Framer Motion**, enhancing the overall user experience with fluid transitions and interactive effects.

### 9. Material-UI for UI Components
**Material-UI** is utilized for building the **user interface** of the website. It provides responsive and visually consistent components, ensuring that the design is both functional and aesthetic.

### 10. MongoDB as the Database
The project uses **MongoDB** as the **database**, offering flexibility and scalability for storing portfolio content such as projects, blogs, FAQs, and skills.

## Technologies and Libraries

- **Next.js** (Pages Router) for frontend and backend routing
- **TypeScript** for type safety and code quality
- **MongoDB** for the database
- **NextAuth.js** for authentication
- **SWR** for data fetching
- **Yup** for form validation
- **React Hook Form** for form management
- **Material-UI** for UI components
- **Framer Motion** for animations
- **Next-Intl** for internationalization support