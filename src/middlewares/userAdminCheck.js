

const userAdminCheck = (req,res,next)=>{
    if(req.session.user.rol === "admin"){
        next()
    } else{
        res.render("error")
        //res.send('No tienes permisos de Administrador')
    }
}

module.exports = userAdminCheck;