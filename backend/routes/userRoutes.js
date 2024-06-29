
const express = require("express");
const multer = require("multer");
const fs = require('fs');
const path = require('path');
const {
  registerController,
  loginController,
  authController,
  postBlogController,
  getAllBlogsForUserController,
  deleteBlogController,
  updateBlogController,
  getAllBlogsController,
  updatesLikesController,
} = require("../controller/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/getuserdata", authMiddleware, authController);
router.post("/postblog", upload.single('photo'), authMiddleware, postBlogController);
router.get('/getallblogs', authMiddleware, getAllBlogsForUserController);
router.delete('/deleteblog/:blogid', authMiddleware, deleteBlogController);
router.patch('/updateblog/:blogid', upload.single('photo'), authMiddleware, updateBlogController);
router.get('/getblogs', getAllBlogsController);
router.post('/updatelikes/:blogid', updatesLikesController);

module.exports = router;
