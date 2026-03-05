console.log("THIS IS THE CORRECT FILE RUNNING")

const express = require("express");
const app = express();

app.use(express.json());

let users = [];
let posts = [];
let comments = [];
let likes = [];

app.get("/", (req, res) => {
  res.json({ message: "Connectly API is running" });
});


// =======================
// USER REGISTER
// =======================
app.post("/register", (req, res) => {

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required" });
  }

  const newUser = {
    id: users.length + 1,
    username,
    password
  };

  users.push(newUser);

  res.status(201).json(newUser);
});


// =======================
// GOOGLE OAUTH (SIMULATED)
// =======================
app.post("/auth/google", (req, res) => {

  const fakeGoogleUser = {
    id: users.length + 1,
    username: "google_user"
  };

  users.push(fakeGoogleUser);

  res.json({
    message: "Google OAuth login simulated",
    user: fakeGoogleUser
  });
});


// =======================
// CREATE POST
// =======================
app.post("/posts", (req, res) => {

  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: "Post content required" });
  }

  const newPost = {
    id: posts.length + 1,
    content,
    createdAt: new Date()
  };

  posts.push(newPost);

  res.status(201).json(newPost);
});


// =======================
// GET ALL POSTS (NEWS FEED)
// =======================
app.get("/posts", (req, res) => {

  const page = parseInt(req.query.page) || 1;
  const limit = 5;

  const start = (page - 1) * limit;
  const end = start + limit;

  const paginatedPosts = posts.slice(start, end);

  res.json({
    page,
    totalPosts: posts.length,
    posts: paginatedPosts
  });
});


// =======================
// ADD COMMENT
// =======================
app.post("/posts/:id/comment", (req, res) => {

  const postId = parseInt(req.params.id);
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: "Comment content required" });
  }

  const post = posts.find(p => p.id === postId);

  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  const newComment = {
    id: comments.length + 1,
    postId,
    content,
    createdAt: new Date()
  };

  comments.push(newComment);

  res.status(201).json(newComment);
});


// =======================
// GET COMMENTS
// =======================
app.get("/posts/:id/comments", (req, res) => {

  const postId = parseInt(req.params.id);

  const postComments = comments.filter(c => c.postId === postId);

  res.json(postComments);
});


// =======================
// LIKE POST
// =======================
app.post("/posts/:id/like", (req, res) => {

  const postId = parseInt(req.params.id);

  const post = posts.find(p => p.id === postId);

  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  const newLike = {
    id: likes.length + 1,
    postId
  };

  likes.push(newLike);

  res.json({
    message: "Post liked",
    like: newLike
  });
});


// =======================
// GET LIKES
// =======================
app.get("/posts/:id/likes", (req, res) => {

  const postId = parseInt(req.params.id);

  const postLikes = likes.filter(l => l.postId === postId);

  res.json({
    postId,
    totalLikes: postLikes.length,
    likes: postLikes
  });
});


// =======================
// DELETE POST
// =======================
app.delete("/posts/:id", (req, res) => {

  const postId = parseInt(req.params.id);

  posts = posts.filter(p => p.id !== postId);

  res.json({ message: "Post deleted" });
});


// =======================
// DELETE COMMENT
// =======================
app.delete("/comments/:id", (req, res) => {

  const commentId = parseInt(req.params.id);

  comments = comments.filter(c => c.id !== commentId);

  res.json({ message: "Comment deleted" });
});


// =======================
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});