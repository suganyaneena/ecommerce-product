const multer = require("multer");

const storage = multer.diskStorage({

  destination: "uploads/",

  filename: (req, file, cb) => {
    
    const cleanName = file.originalname.replace(/\s+/g, "-");

    cb(null, Date.now() + "-" + file.cleanName
    );
  },
});

module.exports = multer({ storage });