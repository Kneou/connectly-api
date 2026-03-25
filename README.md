# Connectly API (Flask) – Terminal Assessment

## 📌 Overview
Connectly API is a social-style backend system built using Python Flask.  
It supports core social features such as posts, comments, and likes, and is enhanced with security and performance optimizations.

---

## 🚀 Features

### 🔐 Security
- Role-Based Access Control (RBAC)
  - Admin users can delete posts and comments
  - Regular users have limited permissions

- Privacy Settings
  - Posts can be set to **public** or **private**
  - Private posts are only visible to the owner

---

### ⚡ Performance
- Pagination
  - Limits number of posts returned per request
  - Example: `/posts?page=1`

---

### 💬 Core Functionalities
- Create Posts
- Comment on Posts
- Like Posts
- View Comments and Likes
- Simulated Google OAuth Login

---

## 🛠️ Tech Stack
- Python
- Flask
- Postman (API Testing)

---

## 📂 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | /register | Register user |
| POST | /auth/google | Simulated Google login |

---

### Posts
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | /posts | Create post |
| GET | /posts | Get posts (with pagination + privacy) |
| DELETE | /posts/:id | Delete post (Admin only) |

---

### Comments
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | /posts/:id/comment | Add comment |
| GET | /posts/:id/comments | Get comments |

---

### Likes
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | /posts/:id/like | Like post |
| GET | /posts/:id/likes | Get likes |

---

## 🔐 RBAC Implementation
Role is passed via request headers:
