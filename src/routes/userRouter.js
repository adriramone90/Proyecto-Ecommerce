const express = require("express")
const router= express.Router();

const uploadAvatar = require("../middlewares/uploadAvatar")

const loginValidator = require("../validations/loginValidator")

const userController= require("../controllers/userControllers")

const registerValidator = require("../validations/registerValidator")

//middleware
const userSessionOnline = require("../middlewares/userSessionOnline")

router.get("/login", userSessionOnline,userController.login);
router.post("/login", loginValidator,userController.processLogin);
router.get("/register", userSessionOnline,userController.register);
router.post("/register", registerValidator, userController.processRegister);
router.get("/logout", userController.logout)

module.exports= router;

