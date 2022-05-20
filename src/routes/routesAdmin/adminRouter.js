const express = require("express");
const router = express.Router();


const adminController = require("../../controllers/adminControllers/adminController")
const adminProductsController = require("../../controllers/adminControllers/adminProductsController")

//Se require el modulo de multer
const uploadImgProducts = require("../../middlewares/uploadImgProducts")

//Se requieren las validaciones
const productsValidator = require("../../validations/productsValidator")

//Se requieren los middlewares para validar el admin
const userSessionActive = require("../../middlewares/userSessionActive");
const userAdminCheck= require("../../middlewares/userAdminCheck")

router.get("/",userSessionActive, userAdminCheck ,adminController.listaProductos);

router.get("/productos/agregar", userSessionActive, userAdminCheck, adminProductsController.addProduct);

router.post("/productos", uploadImgProducts.single("image") ,productsValidator,adminProductsController.createProduct); //Se añade el middleware con metodo single y el name del input file

router.get("/productos/editar/:id", userSessionActive, userAdminCheck,adminProductsController.editProduct);

router.put("/productos/editar/:id", adminProductsController.productoEditado);

router.delete("/productos/eliminar/:id", adminProductsController.delete);

router.get('/productos/buscar', userSessionActive, userAdminCheck,adminProductsController.search);

module.exports = router