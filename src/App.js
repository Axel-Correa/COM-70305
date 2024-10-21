import express from "express" 
const PORT = 3000
const app = express()

app.get("/", (req,res) =>{
    res.send(`<h1>Ccristales</h1>`)
})
app.get("/Productos", (req,res) =>{
    res.send("<h2>Productos</h2>")
})
app.get("/ContactoCD", (req,res) =>{
    res.send("<h2>Contacto</h2>")
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

