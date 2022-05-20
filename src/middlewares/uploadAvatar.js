
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
       cb(null, path.join(__dirname, '../../public/img/users'));
    },
    filename: function (req, file, cb) {
       cb(null, `${Date.now()}_user_${path.extname(file.originalname)}`);  }
  })

  //Se guarda toda la funcion en una variable
  const uploadAvatar = multer({ storage });


  //Se exporta
  module.exports = uploadAvatar;