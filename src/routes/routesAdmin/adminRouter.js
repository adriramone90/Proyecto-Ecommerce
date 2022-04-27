const express = require("express");
const router = express.Router();


const adminController = require("../../controllers/adminControllers/adminController")
const adminProductsController = require("../../controllers/adminControllers/adminProductsController")

//Se require el modulo de multer
const uploadImgProducts = require("../../middlewares/uploadImgProducts")

//Se requieren las validaciones
const productsValidator = require("../../validations/productsValidator")

router.get("/", adminController.listaProductos);

router.get("/productos/agregar", adminProductsController.addProduct);

router.post("/productos", uploadImgProducts.single("image") ,productsValidator,adminProductsController.createProduct); //Se añade el middleware con metodo single y el name del input file

router.get("/productos/editar/:id", adminProductsController.editProduct);

router.put("/productos/editar/:id", adminProductsController.productoEditado);

router.delete("/productos/eliminar/:id", adminProductsController.delete);

router.get('/productos/buscar', adminProductsController.search);

module.exports = router