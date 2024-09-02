const multer = require('multer');
const path = require('path')

const storage = multer.diskStorage({
    destination: function (request, file, cb) {
        cb(null, `uploads/`);
    },
    filename: function (request, file, cb) {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

//export
const upload = multer({storage: storage});
module.exports = upload;