module.exports= {
    login: (req,res)=>{
        res.render("users/login",{
            titulo: "Iniciar sesion"
        })
    },

    register: (req,res) =>{
        res.render('users/register',{
            titulo: 'Registrarse'
        }
        )
    }
}