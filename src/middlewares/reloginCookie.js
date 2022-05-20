const reloginCookie = (req,res,next)=>{
    if(req.cookies.cookieTea){
        req.session.user = req.cookies.cookieTea;
        res.locals.user = req.session.user
    }

    next()
}

module.exports = reloginCookie;