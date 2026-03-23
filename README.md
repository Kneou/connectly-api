# Connectly API (Python Flask)

## Overview

This project is a social-style backend API that allows users to create posts, comment, like, and manage content with role-based access control (RBAC) and privacy settings.

## Features

* User Registration
* Simulated Google OAuth Login
* Create Posts
* Comment on Posts
* Like Posts
* Delete Posts and Comments (Admin only)
* Privacy Settings (Public / Private)
* Pagination (News Feed)

## Technologies Used

* Python (Flask)
* Postman (API Testing)

## How to Run

1. Install dependencies:
   pip install flask

2. Run the server:
   python app.py

3. Open Postman:
   http://localhost:5000

## API Endpoints

POST /register
POST /auth/google

POST /posts
GET /posts?page=1

POST /posts/{id}/comment
GET /posts/{id}/comments

POST /posts/{id}/like
GET /posts/{id}/likes

DELETE /posts/{id} (Admin only)
DELETE /comments/{id} (Admin only)

## Notes

* Data is stored in memory (no database yet)
* Google OAuth is simulated for demonstration
* RBAC is implemented using request headers (role: admin)
