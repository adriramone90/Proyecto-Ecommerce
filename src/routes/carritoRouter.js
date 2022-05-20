const express = require('express');
const router = express.Router();

const carritoController = require('../controllers/carritoController');

const userSessionActive = require("../middlewares/userSessionOnline");

router.get("/", userSessionActive ,carritoController.carrito); 

module.exports = router;