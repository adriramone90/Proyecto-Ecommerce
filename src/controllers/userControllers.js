const {getUsers, writeUsers} = require('../data/data');

const {validationResult}= require("express-validator");

const bcrypt = require("bcryptjs")


module.exports= {
    login: (req,res)=>{
        res.render("users/login",{
            titulo: "Iniciar sesion",
            session:req.session
        })
    },

    processLogin: (req,res)=>{
        let errors = validationResult(req)

        if(errors.isEmpty()){

            //si pasa el login validator, no es necesario hacer validaciones en el controller.
            let user = getUsers.find(user => user.email === req.body.email)

            //a req.session se le puede agregar otro atributo con
            //el nombre que se necesite, en este caso "user"
            //y se le puede asignar el valor que se desea

            //Se guardan los datos que se necesitan en el usuario
            req.session.user = {
                name: user.nombre,
                email: user.email,
                avatar: user.avatar,
                rol:user.rol
            }

            //si se tilda el checkbox se crea la cookie
            //con el tiempo de vida correspondiente
            if(req.body.remember){
                const TIME_COOKIE = 60000 * 5;
                res.cookie('cookieTea',req.session.user,{

                    expires: new Date(Date.now() + TIME_COOKIE),
                    httpOnly: true,
                    secure:true
                })
            }


            //Para poder enviar los datos de req.session.user a la vista
            //se debe guardar en la variable locals

            res.locals.user = req.session.user

            //req.session se debe guardar en todas los render

            res.redirect("/")
        } else{
            res.render("users/login",{
                titulo: "Iniciar sesion",
                errors:errors.mapped(),
                old: req.body,
                session:req.session
            })
        }
   
    },
    
    logout:(req, res)=>{
        
        req.session.destroy();

        

        if(req.cookies.cookieTea){
            res.cookie("cookieTea","",{
                maxAge:-1
            })
        }

        res.redirect("/");
    },
    register: (req,res) =>{
        res.render('users/register',{
            titulo: 'Registrarse',
            session:req.session
        }
        )
    },

    processRegister: (req, res) =>{

        let errors = validationResult(req)

        if(errors.isEmpty()){
            
            let lastId = 0;

            getUsers.forEach(user => {
                if(user.id > lastId){
                    lastId = user.id;
                }
            });


            let newUser = {
                email:req.body.email,
                pass: bcrypt.hashSync(req.body.pass, 12),
                id:lastId + 1,
                avatar: req.file ? req.file.filename : "defaultAvatar.png",
                rol:"user"
            }

            getUsers.push(newUser)

            writeUsers(getUsers)

            res.redirect("/login")
        } else {
            res.render('users/register',{
                titulo: 'Registrarse',
                errors:errors.mapped(),
                old:req.body,
                session:req.session
            })
        }
        
    }
}