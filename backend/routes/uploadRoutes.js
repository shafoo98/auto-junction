import express from 'express'
const router = express.Router()
import dotenv from 'dotenv'
import { v2 as cloudinary } from 'cloudinary'

dotenv.config()

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.route("/").post((req, res, next) => {
  const file = req.files.photo;
  console.log(file.tempFilePath)
 cloudinary.uploader.upload(file.tempFilePath,  async (err, result) => {
    try {
      res.status(200).json(result.url)
    } catch (error) {
      console.log(err)
    }
  });
});

// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, 'uploads/')
//   },
//   filename(req, file, cb) {
//     cb(
//       null,
//       `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
//     )
//   },
// })

// function checkFileType(file, cb) {
//   const fileTypes = /jpg|jpeg|png/
//   const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
//   const mimetype = fileTypes.test(file.mimetype)

//   if (extname && mimetype) {
//     return cb(null, true)
//   } else {
//     cb('Images only!')
//   }
// }

// const upload = multer({
//   storage,
//   fileFilter: function (req, file, cb) {
//     checkFileType(file, cb)
//   },
// })

// router.post('/', upload.single('image'), (req, res) => {
//   res.send(`/${req.file.path}`)
// })

export default router
