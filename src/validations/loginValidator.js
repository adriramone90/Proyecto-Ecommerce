const {check, body}=require("express-validator");
const {getUsers}= require("../data/data");
const bcrypt = require("bcryptjs")

let loginValidator = [
    check('email')
                .notEmpty()
                .isEmail().withMessage('Debe ingresar un email válido').bail(),

    body('custom').custom((value,{req})=>{
        let user = getUsers.find(user => user.email === req.body.email)

        if(bcrypt.compareSync(req.body.pass,user.pass)){
            return true
        }

        return false;
    }).withMessage("Email o contraseña Incorrecta").bail(),

    body('pass').notEmpty().withMessage('Ingrese su contraseña').bail()
]

module.exports= loginValidator;