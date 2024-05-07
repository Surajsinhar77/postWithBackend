const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const fs = require('fs');
const path = require('path');

cloudinary.config({ 
  cloud_name: process.env.cloud_name, 
  api_key: process.env.api_key, 
  api_secret: process.env.api_secret 
});

// Set up storage for uploaded files locally
const localDiskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/post-img/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Set up multer with local storage
const upload = multer({ 
  storage: localDiskStorage,
  fileFilter: (req, file, cb) => {
    const allowedFileTypes = /jpeg|jpg|png/;
    const mimetype = allowedFileTypes.test(file.mimetype);
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only JPEG, JPG, and PNG files are allowed'));
  }
}).single('file');

// Middleware function to handle file upload
const uploadPostMiddleware = (req, res, next) => {
  try {
    const authToken = req?.cookies?.accessToken;
    if (!authToken) {
      return res.status(401).json({ message: 'You are not logged in' });
    }

    upload(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading to local storage
        return res.status(400).json({ message: 'File upload error', error: err });
      } else if (err) {
        // An unknown error occurred when uploading to local storage
        return res.status(400).json({ message: 'An error occurred', error: err });
      }

      // File uploaded successfully to local storage
      // Proceed to Cloudinary upload
      cloudinary.uploader.upload(req.file.path, { folder: 'uploads/post-img' }, (cloudinaryErr, result) => {
        if (cloudinaryErr) {
          // An error occurred when uploading to Cloudinary
          return res.status(400).json({ message: 'Cloudinary upload error', error: cloudinaryErr });
        }

        // File uploaded successfully to Cloudinary
        // Delete the file from local storage
        fs.unlink(req.file.path, (unlinkErr) => {
          if (unlinkErr) {
            console.log('Error deleting file from local storage:', unlinkErr);
          }
        });

        // Pass Cloudinary image URL to the next middleware
        req.cloudinaryUrl = result.secure_url;
        // Proceed to the next middleware
        next();
      });
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: 'An error occurred', error: err });
  }
};

module.exports = uploadPostMiddleware;
