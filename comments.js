// Create web server
// Create a new web server using the express package
const express = require('express');
const app = express();
// Create an array to store comments
const comments = [];
// Create a route to get comments
app.get('/comments', (req, res) => {
  res.json(comments);
});
// Create a route to post comments
app.post('/comments', (req, res) => {
  const comment = req.body.comment;
  comments.push(comment);
  res.json(comment);
});
// Start the web server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

// Path: index.html
<!DOCTYPE html>
<html>
  <head>
    <title>Comments</title>
  </head>
  <body>
    <h1>Comments</h1>
    <ul id="comments"></ul>
    <form id="comment-form">
      <input type="text" id="comment-input" />
      <button type="submit">Add Comment</button>
    </form>
    <script>
      document.getElementById('comment-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        const comment = document.getElementById('comment-input').value;
        const response = await fetch('http://localhost:3000/comments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ comment }),
        });
        const data = await response.json();
        const comments = document.getElementById('comments');
        const commentElement = document.createElement('li');
        commentElement.textContent = data.comment;
        comments.appendChild(commentElement);
      });
      async function fetchComments() {
        const response = await fetch('http://localhost:3000/comments');
        const data = await response.json();
        const comments = document.getElementById('comments');
        comments.innerHTML = '';
        data.forEach((comment) => {
          const commentElement = document.createElement('li');
          commentElement.textContent = comment;
          comments.appendChild(commentElement);
        });
      }
      fetchComments();
    </script>
  </body>
</html>