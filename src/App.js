import express from "express" 
import { ProductsManager } from "./Dao/ProductsManager.js"
import  demonRouter  from "./Routes/ProductsRouter.js"

const PORT = 3000
const app = express() 


app.get("/", (req,res) =>{
    res.setHeader(`Content-Type`,`text/plain`)
    res.status(200).send(`<h1>Ccristales</h1>`)
})

app.use("/productos", demonRouter)
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

