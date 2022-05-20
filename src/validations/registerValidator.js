const {check, body} = require('express-validator')
const {getUsers} = require('../data/data')

const registerValidator = [
    check('email')
                .notEmpty().withMessage('El email es requerido').bail()
                .isEmail().withMessage('Ingrese un mail válido').bail(),
                
    body("email").custom((value)=>{
        let user = getUsers.find(user => user.email === value);
            if(user){
            return false;
            }
            return true;
     }).withMessage("El email ya se encuentra registrado"),
    
    check('pass')
                .notEmpty().withMessage('La contraseña es requerida').bail()
                .isLength({min: 8, max: 12}).withMessage('La contraseña debe tener como mínimo 8 carácteres').bail(),
    
    check('pass2')
                .notEmpty().withMessage('Debe reingresar la contraseña').bail(),


    body('pass2').custom((value, { req }) => {
        if (value !== req.body.pass) {
            return false;
            }

            return true;
        }).withMessage('Las contraseñas deben coincidir'),

    check('terms')
                .isString("on").withMessage('Debes aceptar los términos y condiciones'),

    check('avatar').custom((value, {req}) => {
        if(req.file.mimetype === 'image/png'){
                return '.png';
        }else if(req.file.mimetype === 'image/jpg'){
                return '.jpg';
        } else{
            return false
        }
        }).withMessage('Solo puede subir archivos png o jpg'), // custom error message that will be send back if the file in not a pdf. 
]

module.exports = registerValidator;