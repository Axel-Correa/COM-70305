import { Router } from "express";
import { ProductsManager } from '../Dao/ProductsManager.js';
import { ErrorProcesa } from "../error.js";

export const router = Router();
const productsManager = new ProductsManager()
productsManager.setPath("./src/data/Products.json");

router.get("/", async (req, res) => {
    try {
        console.log("Solicitando productos");
        let productos = await productsManager.getProductos();
        console.log("Productos obtenidos");

        res.setHeader('Content-type', 'application/json');
        return res.status(200).json({ productos });
    } catch (error) {
        ErrorProcesa(res, error);
    }
});

router.get("/:id", async (req, res) => {
    let { id } = req.params;
    id = Number(id);
    if (isNaN(id)) {
        return res.status(400).send(`id debe ser numerico`);
    }
    try {
        let productos = await productsManager.getProductos();
        let product = productos.find(p => p.id === id);
        if (!product) {
            return res.status(404).send(`No se encuentran productos con este id ${id}`);
        }
        res.status(200).send(product);
    } catch (error) {
        ErrorProcesa(res, error);
    }
});

router.post("/", async (req, res) => {
    let { name, id, ...otros } = req.body;
    console.log(otros);
    if (id) {
        res.setHeader('Content-type', 'application/json');
        return res.status(400).json({ error: `El id se genera automáticamente` });
    }
    if (!name) {
        res.setHeader('Content-type', 'application/json');
        return res.status(400).json({ error: `El nombre es requerido` });
    }
    try {
        let productos = await productsManager.getProductos();
        let existe = productos.find(p => p.name.toLowerCase() === name.trim().toLowerCase());
        if (existe) {
            res.setHeader('Content-type', 'application/json');
            return res.status(400).json({ error: `${name} ya existe en la Base de datos` });
        }
        let NuevoProducto = await productsManager.addProductos({ name, ...otros });
        res.setHeader('Content-type', 'application/json');
        return res.status(201).json({ NuevoProducto });
    } catch (error) {
        ErrorProcesa(res, error);
    }
});

router.put("/:id", async (req, res) => {
    // Implementar lógica para actualizar un producto
});

router.delete("/:id", async (req, res) => {
    // Implementar lógica para eliminar un producto
});

export default router;