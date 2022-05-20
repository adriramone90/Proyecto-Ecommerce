const{getProducts} = require("../data/data")



module.exports = {
    index: (req,res) => {

        res.render("index",{
            productos:getProducts,
            titulo: "Tea | Tienda de té",
            session:req.session
        })
    }
}

