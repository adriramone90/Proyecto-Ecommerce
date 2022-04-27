const {check, body} = require('express-validator')

const productsValidator = [
    check('name')
        .notEmpty().withMessage('Debe ingresar un nombre para el producto').bail()
        .isLength({min:2, max:20}).withMessage('Debe tener como máximo 20 letras'),

    check('price')
        .isNumeric().withMessage('Ingrese el precio en números y sin símbolos ($)').bail(),
        
    check('description')
        .notEmpty().withMessage('Ingrese una descripción del producto').bail(),

    check('image')
        .notEmpty().withMessage('Debe subir una imagen del producto').bail(),
    
    body('image').custom((value, {req}) => {
        if(req.file.mimetype === 'jpg' || req.file.mimetype === "png"){
            if(req.file.mimetype === 'jpg'){
                return '.jpg'
            } else{
                return '.png'
            };
        }else{
            return false;
        }
    }).withMessage('Solo se puede subir archivos con extensión png o jpg').bail(),

    body('image').custom((value,{req})=>{
        if(req.file.size <= 20971520){
            return true
        }

        return false
    }).withMessage('El archivo debe pesar máximo 20Mb').bail()
]

module.exports = productsValidator