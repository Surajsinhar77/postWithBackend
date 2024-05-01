const express = require('express');
const cors = require('cors');
require('dotenv').config();
const userAuthtication = require('./middleware/userAuthtication.js');
const connectionToDB = require('./config/db_connection.js');
const cookieParser = require('cookie-parser');

const app = express();

// Connect to the database
connectionToDB()

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// routes imports
const usersRoutes = require('./routes/users.routes.js');
const postsRoutes = require('./routes/posts.routes.js');
const commentsRoutes = require('./routes/comments.routes.js');

// routes
app.use('/auth', usersRoutes);
app.use('/posts', userAuthtication, postsRoutes);
app.use('/post/comments', userAuthtication, commentsRoutes);


// server is listening on info
app.listen(8000, ()=>{
	console.log("This is the server")
});


// This is the middleware for unknown error into the server
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error for debugging
  
  // Send a generic error response
  res.status(500).json({
    error: 'Internal Server Error',
    message: 'An unexpected error occurred. Please try again later.'
  });
});