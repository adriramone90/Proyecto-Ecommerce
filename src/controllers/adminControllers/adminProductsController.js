const {getProducts, writeProducts} = require("../../data/data");
const {validationResult}=require('express-validator')

module.exports = {
    addProduct: (req, res)=>{
        res.render("admin/products/addProducts",{
            titulo: "Nuevo producto",
            postHeader: "Ingrese los datos del nuevo producto"
        })
    },
    createProduct: (req,res)=>{

        let errors = validationResult(req)

        if(errors.isEmpty()){
            let lastId = 0;

        getProducts.forEach(producto => {
            if(producto.id > lastId){
                lastId = producto.id;
            }
        });


        let newProduct = {
            ...req.body,
            id:lastId + 1,
            image: req.file ? req.file.filename : "default.jpg",
            ingredients: [req.body.ingredient1,req.body.ingredient2,req.body.ingredient3]
        }

        getProducts.push(newProduct)

        writeProducts(getProducts)

        res.redirect("/admin")
        } else{
            res.render("admin/products/addProducts",{
                titulo: "Nuevo producto",
                postHeader: "Ingrese los datos del nuevo producto",
                errors: errors.mapped(),
                old: req.body
            })
        }

        
    },

    editProduct: (req,res)=>{
        let idProducto = +req.params.id;
        let producto = getProducts.find(producto => producto.id === idProducto)

        res.render('admin/products/editProducts', {
            postHeader: "Editar Producto",
            titulo: "Edición",
            producto
        })


    },

    productoEditado: (req,res)=>{
        let idProducto = +req.params.id;


        getProducts.forEach(producto => {
            if(producto.id === idProducto){
                producto.name = req.body.name
                producto.description = req.body.description
                producto.price = req.body.price
                producto.coment = req.body.coment
            }
        })

        writeProducts(getProducts);

        res.redirect('/admin');
    },

    delete: (req,res)=>{
        let idProducto = +req.params.id;

        getProducts.forEach(producto =>{
            if(producto.id === idProducto){
                let productoEliminado = getProducts.indexOf(producto);

                getProducts.splice(productoEliminado,1)
            }
        })

        writeProducts(getProducts);

        res.redirect("/admin")
    },

    search: (req, res) => {
        let search = req.query.search;

        let searchProduct = search.toLowerCase()

        result = [];

        getProducts.forEach(producto =>{

            const removeAccents = (str) => {
                return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
              }

            let temp = removeAccents(producto.name.toLowerCase())

            //let temp = removeAccents(string)

            if(temp.includes(searchProduct)){
                result.push(producto)
            }
        })

        res.render('admin/resultAdmin',{
           titulo: `resultados de ${searchProduct}`,
           postHeader: `resultados de ${searchProduct}`,
           productos: result
         })
    }
}