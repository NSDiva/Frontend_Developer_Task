# Frontend Developer Task - MERN Stack

## Project Overview
This is a scalable web application with Authentication (JWT) and a Dashboard for managing tasks. It is built using the MERN stack (MongoDB, Express, React, Node.js).

## Features
- **Authentication:** Secure Signup and Login using JWT and bcrypt.
- **Dashboard:** Protected route that displays user-specific data.
- **CRUD Operations:** Users can Create, Read, and Delete tasks.
- **Responsive Design:** Built with TailwindCSS for mobile and desktop support.

## Scalability Note
To ensure this application can scale for production:
1. **Modular Architecture:** The backend separates Models, Controllers, and Routes. This allows new features (like "Notes" or "Profile") to be added without breaking existing logic.
2. **Stateless Authentication:** Using JSON Web Tokens (JWT) means the server does not need to store session data, allowing horizontal scaling across multiple servers.
3. **Database:** MongoDB is NoSQL and schema-less, allowing for flexible data models as the application grows.

## API Documentation
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| POST | `/api/register` | Register a new user | No |
| POST | `/api/login` | Login and receive JWT | No |
| GET | `/api/tasks` | Fetch user's tasks | Yes (Header: Authorization) |
| POST | `/api/tasks` | Create a new task | Yes (Header: Authorization) |
| DELETE | `/api/tasks/:id` | Delete a specific task | Yes (Header: Authorization) |

## How to Run Locally
1. **Backend:**
   ```bash
   cd server
   npm install
   node server.js

1. **Frontend:**
   ```bash
   cd client
   npm install
   npm run dev

---

### **Step 2: Prepare for GitHub (Crucial)**

Before you upload, we must make sure you don't upload massive unnecessary files (like `node_modules`).

1.  **Create a `.gitignore` file:**
    * In the main `frontend-task` folder, create a file named `.gitignore`.
    * Paste this inside:
        ```text
        node_modules
        .env
        dist
        .DS_Store
        ```
    * *Do this inside the `server` folder and `client` folder too if you want to be safe, but the main one usually works if initialized correctly.*

---

### **Step 3: Upload to GitHub**

This is the most important deliverable[cite: 32].

1.  Log in to your **GitHub** account in your browser.
2.  Click the **+** icon (top right) -> **New Repository**.
3.  Name it `frontend-developer-task`. Make it **Public**. Click **Create**.
4.  Copy the URL of your new repo (e.g., `https://github.com/YourName/frontend-developer-task.git`).

**Now, go to your VS Code Terminal (root folder `frontend-task`):**
Run these commands one by one:

```bash
git init
git add .
git commit -m "Initial commit - Completed Frontend task"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/frontend-developer-task.git
git push -u origin main