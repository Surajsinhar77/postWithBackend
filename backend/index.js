const express = require('express');
const cors = require('cors');
require('dotenv').config();
const userAuthtication = require('./middleware/userAuthtication.js');
const connectionToDB = require('./config/db_connection.js');
const cookieParser = require('cookie-parser');
// const uploadMiddleware = require('./utlity/fileuploader.middleware');
const port = process.env.PORT || 8000;

const app = express();

// Connect to the database
connectionToDB()

app.use(cors({
  origin: ['http://localhost:5173', 'https://68b1ef51-ca7b-41f7-9542-b48746f259c4.e1-us-east-azure.choreoapps.dev/'],
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
app.listen(port, ()=>{
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