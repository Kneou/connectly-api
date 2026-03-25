from flask import Flask, request, jsonify

app = Flask(__name__)

users = []
posts = []
comments = []
likes = []

# ---------------- AUTH ----------------
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    user = {
        "id": len(users) + 1,
        "username": data['username'],
        "role": data.get("role", "user")
    }
    users.append(user)
    return jsonify(user)

@app.route('/google-login', methods=['POST'])
def google_login():
    data = request.json
    user = {
        "id": len(users) + 1,
        "username": data['email'],
        "role": "user"
    }
    users.append(user)
    return jsonify({"message": "Google OAuth simulated", "user": user})

# ---------------- POSTS ----------------
@app.route('/posts', methods=['POST'])
def create_post():
    data = request.json
    post = {
        "id": len(posts) + 1,
        "userId": data['userId'],
        "content": data['content'],
        "privacy": data.get("privacy", "public")
    }
    posts.append(post)
    return jsonify(post)

@app.route('/posts', methods=['GET'])
def get_posts():
    page = int(request.args.get('page', 1))
    userId = request.args.get("userId")

    visible = []
    for p in posts:
        if p['privacy'] == "public":
            visible.append(p)
        elif userId and str(p['userId']) == userId:
            visible.append(p)

    start = (page - 1) * 5
    end = start + 5

    return jsonify({
        "page": page,
        "data": visible[start:end]
    })

# ---------------- RBAC DELETE ----------------
@app.route('/posts/<int:id>', methods=['DELETE'])
def delete_post(id):
    role = request.headers.get("role")

    if role != "admin":
        return jsonify({"error": "Unauthorized"}), 403

    global posts
    posts = [p for p in posts if p['id'] != id]

    return jsonify({"message": "Deleted"})

# ---------------- COMMENTS ----------------
@app.route('/comments', methods=['POST'])
def add_comment():
    data = request.json
    comment = {
        "id": len(comments) + 1,
        "postId": data['postId'],
        "content": data['content']
    }
    comments.append(comment)
    return jsonify(comment)

@app.route('/comments/<int:postId>', methods=['GET'])
def get_comments(postId):
    return jsonify([c for c in comments if c['postId'] == postId])

# ---------------- LIKES ----------------
@app.route('/like', methods=['POST'])
def like_post():
    data = request.json
    like = {
        "postId": data['postId'],
        "userId": data['userId']
    }
    likes.append(like)
    return jsonify(like)

@app.route('/likes/<int:postId>', methods=['GET'])
def get_likes(postId):
    return jsonify([l for l in likes if l['postId'] == postId])

# ---------------- RUN ----------------
if __name__ == "__main__":
    app.run(debug=True)