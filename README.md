# ideanest-qualification-task
A RESTful API built with Express and TypeScript to manage company data, featuring CRUD operations on the Company entity with user authentication. Designed for deployment on Vercel and containerized with Docker for consistent, scalable, and secure backend management of organization data.
## How to Run the App

To run the Ideanest API, follow these steps:

1. **Clone the repository:**
    ```sh
    git clone https://github.com/ayaarragab/ideanest-qualification-task.git
    cd ideanest-qualification-task
    ```

2. **Install dependencies:**
    ```sh
    npm install
    ```

3. **Set up environment variables:**
    Create a `.env` file in the root directory and add the following variables:
    ```env
    PORT=8080
    DATABASE_URL=your_database_connection_string
    JWT_SECRET=your_jwt_secret
    REFRESH_TOKEN_SECRET=your_refresh_jwt_secret

    ```

4. **Run the application:**
    ```sh
    npm run dev
    ```

5. **Access the API:**
    Open your browser or API client and navigate to `http://localhost:8080/ideanest/api`.

Now you can start using the Ideanest API to manage your company data.

## Table of Contents

- [Authentication](#authentication)
- [Endpoints](#endpoints)
- [Error Codes](#error-codes)

## Authentication

To access the API, you must include a valid JWT Token in the header. Register to have it.

**Header:**

Authorization: Bearer YOUR_TOKEN

## Endpoints
