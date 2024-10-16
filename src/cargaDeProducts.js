const fs = require ("fs")
let ruta = "products.json"
let product = [
    {id: 1,
        nombre: "Optica",
        category:"Opticas",
        precio: 120000
    },

    {id: 2,
        nombre: "Paragolpe",
        category:"Paragolpes",
        precio: 150000
    },

    {id: 3,
        nombre: "Guardabarro",
        category:"Guardabarros",
        precio: 60000
    },

    {id: 4,
        nombre: "Faro",
        category:"Faros",
        precio: 80000
    },





];
fs.writeFileSync(ruta,JSON.stringify(product,null,4))