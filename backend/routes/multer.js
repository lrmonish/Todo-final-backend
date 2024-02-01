const multer = require('multer');


const upload = multer({
    
    limits: {
      fileSize: 1024 * 1024 * 1, 
    },
    fileFilter:  (req, file, cb) => {
      if (!file.originalname.match('.jpg')) {
        return cb(new Error('Only jpg files are allowed'));
      }
       cb(null, true);
     
    },
  });

  module.exports= upload;