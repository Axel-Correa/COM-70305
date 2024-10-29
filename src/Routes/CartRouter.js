import { Router } from "express";
import { promises as fs } from "fs"; 
import { ErrorProcesa } from "../error.js";

const router = Router();
const cartsRuta = './src/data/carts.json'; 
const readCarts = async () => {
    try {
        const data = await fs.readFile(cartsRuta, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error leyendo carritos:", error);
        return [];
    }
};
const writeCarts = async (carts) => {
    try {
        await fs.writeFile(cartsRuta, JSON.stringify(carts, null, 2));
    } catch (error) {
        console.error("Error escribiendo carritos:", error);
    }
};
router.post("/", async (req, res) => {
    try {
        const carts = await readCarts();
        const newCart = {
            id: carts.length > 0 ? carts[carts.length - 1].id + 1 : 1,
            products: []
        };
        carts.push(newCart);
        await writeCarts(carts);
        res.status(201).json(newCart);
    } catch (error) {
        ErrorProcesa(res, error);
    }
});
router.get("/:cid", async (req, res) => {
    const cartId = parseInt(req.params.cid);
    if (isNaN(cartId)) {
        return res.status(400).send(`El id debe ser numérico`);
    }
    try {
        const carts = await readCarts();
        const cart = carts.find(c => c.id === cartId);
        if (!cart) {
            return res.status(404).send(`Carrito no encontrado`);
        }
        res.status(200).json(cart.products);
    } catch (error) {
        ErrorProcesa(res, error);
    }
});
router.post("/:cid/product/:pid", async (req, res) => {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);
    if (isNaN(cartId) || isNaN(productId)) {
        return res.status(400).send(`El id del carrito y el id del producto deben ser numéricos`);
    }
    try {
        const carts = await readCarts();
        const cart = carts.find(c => c.id === cartId);
        if (!cart) {
            return res.status(404).send(`Carrito no encontrado`);
        }
        const productInCart = cart.products.find(p => p.product === productId);
        if (productInCart) {
            productInCart.quantity += 1; 
        } else {
            cart.products.push({ product: productId, quantity: 1 }); 
        }
        await writeCarts(carts); 
        res.status(200).json(cart); 
    } catch (error) {
        ErrorProcesa(res, error);
    }
});

export default router;
