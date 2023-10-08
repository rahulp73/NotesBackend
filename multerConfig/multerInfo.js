const multer = require('multer');
const path = require('path')
const {v4 : uuidv4} = require('uuid')

const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, 'images/')
    },
    filename : (req, file, cb) => {
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname))
    }
})

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png']
    if(allowedFileTypes.includes(file.mimetype)){
        cb(null, true)
    } else {
        cb(null, false)
    }

}

const upload = multer({ storage : storage, fileFilter : fileFilter})
module.exports = upload