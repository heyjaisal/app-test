# API Documentation

**Base URL**: `https://app-test343434343434.onrender.com`

---

## 1. Authentication

### Register User
Registers a new user account.
- **Endpoint**: `POST /api/auth/register`
- **Content-Type**: `application/json`
- **Payload**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "strongpassword123"
  }
  ```
- **Success Response (201 Created)**:
  ```json
  {
    "_id": "651f1c24e9b8b...",
    "name": "John Doe",
    "email": "john@example.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```
- **Error Responses**:
  - `400 Bad Request`: `{ "message": "Please fill all fields" }`
  - `400 Bad Request`: `{ "message": "User already exists" }`
  - `400 Bad Request`: `{ "message": "Invalid user data" }`

### Login User
Authenticates an existing user and retrieves an access token.
- **Endpoint**: `POST /api/auth/login`
- **Content-Type**: `application/json`
- **Payload**:
  ```json
  {
    "email": "john@example.com",
    "password": "strongpassword123"
  }
  ```
- **Success Response (200 OK)**:
  ```json
  {
    "_id": "651f1c24e9b8b...",
    "name": "John Doe",
    "email": "john@example.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```
- **Error Responses**:
  - `401 Unauthorized`: `{ "message": "Invalid email or password" }`

---

## 2. Blogs

All protected routes require an `Authorization` header containing the JWT token.
Example: `Authorization: Bearer <your_jwt_token>`

### Get All Blogs
Retrieves a list of all published blogs, sorted by creation date descending.
- **Endpoint**: `GET /api/blogs`
- **Query Parameters**: `?category=Tech` (Optional filter by category)
- **Authorization**: Not required
- **Success Response (200 OK)**:
  ```json
  [
    {
      "_id": "651f1c24e9...",
      "title": "My First Blog",
      "description": "This is a detailed description of the blog.",
      "category": "Tech",
      "tags": ["tech", "coding"],
      "image": "https://s3.amazonaws.com/bucket/image.jpg",
      "user": {
        "_id": "651f1c24e9b8b...",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "createdAt": "2023-10-01T12:00:00.000Z",
      "updatedAt": "2023-10-01T12:00:00.000Z",
      "__v": 0
    }
  ]
  ```
- **Error Response**: `500 Internal Server Error`

### Get My Blogs
Retrieves a list of blogs authored by the currently authenticated user.
- **Endpoint**: `GET /api/blogs/my`
- **Authorization**: Required
- **Success Response (200 OK)**: Array of blog objects (same format as *Get All Blogs*)
- **Error Response**: `500 Internal Server Error`

### Create Blog
Creates a new blog entry.
- **Endpoint**: `POST /api/blogs`
- **Authorization**: Required
- **Content-Type**: `application/json`
- **Payload**:
  ```json
  {
    "title": "My Awesome Post",
    "description": "Content of my post goes here.",
    "category": "Tech",
    "tags": ["react", "frontend"],                 // Optional
    "image": "https://s3.amazonaws.com/bucket/img" // Optional
  }
  ```
- **Success Response (201 Created)**: Returns the newly created blog object.
- **Error Responses**:
  - `400 Bad Request`: `{ "message": "Title, description, and category are required" }`
  - `500 Internal Server Error`

### Update Blog
Updates an existing blog entry. Users can only update their own blogs.
- **Endpoint**: `PUT /api/blogs/:id`
- **Authorization**: Required
- **Content-Type**: `application/json`
- **Payload** *(Fields are optional; only provided fields will be updated)*:
  ```json
  {
    "title": "Updated Title",
    "description": "Updated content goes here.",
    "category": "Lifestyle",
    "tags": ["new-tag"],
    "image": "https://s3.amazonaws.com/bucket/new-img"
  }
  ```
- **Success Response (200 OK)**: Returns the updated blog object.
- **Error Responses**:
  - `404 Not Found`: `{ "message": "Blog not found" }`
  - `401 Unauthorized`: `{ "message": "User not authorized" }`
  - `500 Internal Server Error`

### Delete Blog
Deletes a specific blog entry. Users can only delete their own blogs.
- **Endpoint**: `DELETE /api/blogs/:id`
- **Authorization**: Required
- **Success Response (200 OK)**: `{ "message": "Blog removed" }`
- **Error Responses**:
  - `404 Not Found`: `{ "message": "Blog not found" }`
  - `401 Unauthorized`: `{ "message": "User not authorized" }`
  - `500 Internal Server Error`

---

## 3. Uploads

These endpoints handle file uploads to AWS S3. 
**Note**: You must use `multipart/form-data` encoding when sending forms with files.

### Upload Multiple Images
Uploads multiple images to S3 (Limit: 10 images).
- **Endpoint**: `POST /api/upload/images`
- **Content-Type**: `multipart/form-data`
- **Payload**: Form-data should contain a key `files` holding the image files.
- **Success Response (200 OK)**:
  ```json
  {
    "urls": [
      "https://s3.amazonaws.com/bucket/image1.jpg",
      "https://s3.amazonaws.com/bucket/image2.jpg"
    ]
  }
  ```
- **Error Responses**:
  - `400 Bad Request`: `{ "message": "No images uploaded" }` or `{ "error": "..." }`

### Upload Single Image
Uploads a single image to S3.
- **Endpoint**: `POST /api/upload/image`
- **Content-Type**: `multipart/form-data`
- **Payload**: Form-data should contain a key `file` holding the image file.
- **Success Response (200 OK)**:
  ```json
  {
    "url": "https://s3.amazonaws.com/bucket/image.jpg"
  }
  ```
- **Error Response**: `400 Bad Request`: `{ "error": "..." }`

### Upload Video
Uploads a single video to S3.
- **Endpoint**: `POST /api/upload/video`
- **Content-Type**: `multipart/form-data`
- **Payload**: Form-data should contain a key `file` holding the video file.
- **Success Response (200 OK)**:
  ```json
  {
    "url": "https://s3.amazonaws.com/bucket/video.mp4"
  }
  ```
- **Error Response**: `400 Bad Request`: `{ "error": "..." }`

### Delete File
Deletes a file uploaded to S3.
- **Endpoint**: `DELETE /api/upload/delete`
- **Content-Type**: `application/json`
- **Payload**:
  ```json
  {
    "key": "your_s3_file_key"
  }
  ```
- **Success Response (200 OK)**: `{ "success": true }`
- **Error Responses**:
  - `400 Bad Request`: `{ "error": "Key required" }`
  - `500 Internal Server Error`: `{ "error": "..." }`
