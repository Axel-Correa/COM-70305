import { ProductsManager } from "./ProductsManager.js"; // Asegúrate de importar correctamente

const rutaArchivo = "./Data/Products.json"; // Asegúrate de que la ruta sea correcta
const manager = new ProductsManager(rutaArchivo);

(async () => {
    try {
        const productos = await manager.getProductos(); // Obtener los productos
        console.log("Productos:", productos); // Imprimir los productos obtenidos
    } catch (error) {
        console.error("Error al obtener los productos:", error); // Manejo de errores
    }
})();
