const process = require('process');
require('dotenv').config();
const PORT = process.env.PORT || 3030;


let express = require("express");
let app = express();
let bodyParser = require("body-parser")
let path = require("path")
const methodOverride = require('method-override');

const userRouter= require('../src/routes/userRouter');
const indexRouter = require("../src/routes/indexRouter");
const productsRouter = require("../src/routes/productsRouter");
const adminRouter = require("../src/routes/routesAdmin/adminRouter");
const carritoRouter = require("../src/routes/carritoRouter");


//Middlewares
app.use(express.static(path.join(__dirname, "../public")))
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(methodOverride('_method'));


app.set("view engine","ejs");
app.set("views", path.join(__dirname, "/views"));



app.use('/', userRouter);
app.use("/", indexRouter);
app.use("/producto", productsRouter);
app.use("/admin", adminRouter);
app.use("/carrito", carritoRouter);


app.listen(3030, function(){
    console.log(`Servidor abierto en puerto ${PORT}`)
})


///asdasdasdasdasdasdsadas