const multer = require("multer");

const storage = multer.diskStorage({

  destination: "uploads/",

  filename: (req, file, cb) => {
    
     const cleanName = file.originalname
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9.-]/g, "");

    cb(null, `${Date.now()}-${cleanName}`);
  },
});

module.exports = multer({ storage });