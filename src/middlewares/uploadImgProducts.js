//Primero se requiere multer

const multer = require("multer");
const path = require("path");

//Se declar la funcion storage que determina la ruta donde se guarda el archivo y el nombre!
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
       cb(null, path.join(__dirname, '../../public/img/products'));
    },
    filename: function (req, file, cb) {
       cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);  }
  })

  //Se guarda toda la funcion en una variable
  const uploadImgProducts = multer({ storage });


  //Se exporta
  module.exports = uploadImgProducts;