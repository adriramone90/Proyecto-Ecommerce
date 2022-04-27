const { json } = require("express/lib/response");
const fs = require("fs");
const path = require("path");

let leerJson =(rutaJson)=>{
    return JSON.parse(fs.readFileSync(path.join(__dirname, rutaJson),"utf-8"))
}

let escribirJson=(rutaJson, data)=>{
    return fs.writeFileSync(path.join(__dirname, rutaJson),JSON.stringify(data))
}

module.exports = {
    getProducts: leerJson("/productos.json"),

    writeProducts: (data)=> escribirJson("/productos.json",data),

    getUsers: leerJson("/users.json"),

    writeUsers: (data)=> escribirJson("/users.json", data),

}

