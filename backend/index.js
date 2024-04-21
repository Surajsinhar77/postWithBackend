const express = require('express');
const cors = require('cors');
require('dotenv').config();
const userAuthtication = require('./middleware/userAuthtication.js');
const connectionToDB = require('./config/db_connection.js');


connectionToDB();

const app = express(express.json());
app.use(cors());

// routes imports
const usersRoutes = require('./routes/users.routes.js');
const postsRoutes = require('./routes/posts.routes.js');
const commentsRoutes = require('./routes/comments.routes.js');

// routes
app.use('/auth' usersRoutes);
app.use('/posts', userAuthtication, postsRoutes);
app.use('/comments', userAuthtication, commentsRoutes);


// server is listening on info
app.listen(8000, ()=>{
	console.log("this is the serber")
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