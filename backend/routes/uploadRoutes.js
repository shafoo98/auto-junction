import path from 'path'
import express from 'express'
import multer from 'multer'
const router = express.Router()
import { v2 as cloudinary } from 'cloudinary'

const cloudinary_url = process.env.CLOUDINARY_URL

cloudinary.config({
  cloud_name: "auto-junction-store",
  api_key: "591384915411192",
  api_secret: "MKwY0XraLNo8CGczrz994wd3NUg",
});

router.route("/").post((req, res, next) => {
  const file = req.files.photo;
  cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
    res.status(200).json(result.url)
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
