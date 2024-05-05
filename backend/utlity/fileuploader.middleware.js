const multer = require('multer');

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Create the multer instance
const upload = multer({ storage: storage }).single('file');

// Middleware function to handle file upload
const uploadMiddleware = (req, res, next) => {
  upload(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      return res.status(400).json({ message: 'Multer error occurred.', error: err });
    } else if (err) {
      // An unknown error occurred when uploading.
      return res.status(500).json({ message: 'An error occurred.', error: err });
    }
    // File uploaded successfully, attach file path to req object.
    req.filePath = req.file.path;
    next();
  });
};

module.exports = uploadMiddleware;
