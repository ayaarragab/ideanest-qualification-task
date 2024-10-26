# ideanest-qualification-task
A RESTful API built with Express and TypeScript to manage company data, featuring CRUD operations on the Company entity with user authentication. Designed for deployment on Vercel and containerized with Docker for consistent, scalable, and secure backend management of organization data.
## How to Run the App

To run the Ideanest API, follow these steps:

1. **Clone the repository:**
    ```sh
    git clone https://github.com/ayaarragab/ideanest-qualification-task.git
    cd ideanest-qualification-task
    ```


2. **Run the application:**
    ```sh
    docker-compose up
    ```

5. **Access the API:**
    Open your browser or API client and navigate to `http://localhost:8080/ideanest/api`.

Now you can start using the Ideanest API to manage your company data.

## Table of Contents

- [Authentication](#authentication)
- [Endpoints](#endpoints)

## Authentication

To access the API, you must include a valid JWT Token in the header. Register to have it.

**Header:**

Authorization: Bearer YOUR_TOKEN

## Endpoints

### Auth Endpoints

#### Sign Up

**POST** `/signup`

##### Request body

```json
{
    "email": "<email>",
    "password": "<password>"
}
```

##### Response

```json
{
    "status": "success",
    "message": "You've signed up successfully.",
    "token": "authorization token",
    "data": {
        // user object
    }
}
```

#### Sign In

**POST** `/signin`

##### Request body

```json
{
    "email": "<email>",
    "password": "<password>"
}
```

##### Response

```json
{
    "status": "success",
    "message": "You've signed in successfully.",
    "token": "authorization token",
    "data": {
        // user object
    }
}
```

#### Refresh Token

**POST** `/refresh-token`

##### Request body

```json
{
    "refreshToken": "<refresh_token>"
}
```

##### Response

```json
{
    "status": "success",
    "message": "Token refreshed successfully.",
    "token": "new authorization token"
}
```

### Organization Endpoints

#### Create Organization

**POST** `/organization`

##### Request body

```json
{
    "name": "<organization_name>",
    "description": "<organization_description>"
}
```

##### Response

```json
{
    "status": "success",
    "message": "Organization created successfully.",
    "data": {
        // organization object
    }
}
```

#### Get Organization

**GET** `/organization/:organization_id`

##### Response

```json
{
    "status": "success",
    "data": {
        // organization object
    }
}
```

#### Get All Organizations

**GET** `/organization`

##### Response

```json
{
    "status": "success",
    "data": [
        // array of organization objects
    ]
}
```

#### Update Organization

**PUT** `/organization/:organization_id`

##### Request body

```json
{
    "name": "<new_organization_name>",
    "description": "<new_organization_description>"
}
```

##### Response

```json
{
    "status": "success",
    "message": "Organization updated successfully.",
    "data": {
        // updated organization object
    }
}
```

#### Delete Organization

**DELETE** `/organization/:organization_id`

##### Response

```json
{
    "status": "success",
    "message": "Organization deleted successfully."
}
```

#### Invite User to Organization

**POST** `/organization/:organization_id/invite`

##### Request body

```json
{
    "email": "<user_email>"
}
```

##### Response

```json
{
    "status": "success",
    "message": "User invited successfully."
}
```
