let {getProducts, writeProducts} = require("../../data/data");

module.exports = {
    listaProductos: (req,res) =>{
        res.render("admin/indexAdmin",{
            titulo: "Administrador de productos",
            postHeader: "Lista de Productos",
            productos: getProducts
        })
    }
}