const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: "thumb",
  allowedFormats: ["jpg", "png"],
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },

  transformation: [
    { width: 200, height: 200, crop: "fill", named: "thumbnail" },
    { width: 800, height: 800, crop: "fill", named: "large" },
  ],
});


const upload = multer({ storage });


module.exports = { upload };
