module.exports = {
    carrito: (req, res) => {
        res.render("products/Carrito", {
            titulo: "Tus Compras",
            session:req.session
        })
    }
}