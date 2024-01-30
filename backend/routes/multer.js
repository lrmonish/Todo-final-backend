const multer = require('multer');


const upload = multer({
    // dest: 'uploads/documents', // Store uploaded files in 'uploads/documents' directory
    limits: {
      fileSize: 1024 * 1024 * 1, // Limit file size to 1 MB (1048576 bytes)
    },
    fileFilter:  (req, file, cb) => {
      if (!file.originalname.match('.jpg')) {
        return cb(new Error('Only jpg files are allowed'));
      }
       cb(null, true);
     
    },
  });

  module.exports= upload;