import express from "express" 
import { ProductsManager } from "./Dao/ProductsManager.js"


const PORT = 3000
const app = express()
const rutaArchivo = "./src/Data/Products.json"
const productsManager = new ProductsManager (rutaArchivo)

app.get("/", (req,res) =>{
    res.setHeader(`Content-Type`,`text/plain`)
    res.status(200).send(`<h1>Ccristales</h1>`)
})

app.get("/productos",)

app.get("/productos",async (req,res) =>{
    let productos = await productsManager.getProductos() 
    let {limit, skip} = req.query
    let respuesta = productos
    if (!limit){
        limit = productos.length    
    }else{
        limit=Number(limit)
        if (isNaN(limit)){
            return res.send(`limit debe de ser numerico`)
        }
    }
    if (!skip){
        skip= 0
    }else{
        skip=Number(skip)
        if (isNaN(skip)){
            return res.send(`skip debe de ser numerico`)
        }
    }
respuesta = respuesta.slice(skip,limit + skip)
    res.send(respuesta)
})

app.get("/productos/:id",async (req,res) =>{
    let {id} =req.params
    id=Number(id)
    if(isNaN(id)){
        return res.status(400).send(`id debe ser numerico`)
    }
    
    let productos = await ProductsManager.getProductos()
    let product = productos.find (p=>p.id===id)
    if (!product){
        return res.status(404).send (`No se encuentran productos con este id ${id}`)
    }
    res.status(200).send(productos)
})


app.listen(PORT, ()=>{
    console.log(`Server online en el puerto ${PORT}`)
})



/*const moment =require("moment")
let fechaActual = moment ()
console.log (fechaActual)

let fechaCumpleaños = moment ("20051704") 
if(!fechaCumpleaños.isValid()){
    console.log("fecha incorrecta")
    return
}
console.log()`usted ha nacido ${fechaActual.diff(fechaCumpleaños,"year")} años`*/

