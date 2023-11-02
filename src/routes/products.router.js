import { Router } from "express";
import { productsManager } from "../managers/productsManager.js"

const productsRouter = Router();


productsRouter.get("/", async (req, res) => {
    try {
        const products = await productsManager.findAll()
        res.status(200).json({ message: "Products", products });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

productsRouter.get('/:pId', async (req, res) => {
    try {
        const { pid } = req.params;
        const productId = await productsManager.findById(pid);
        res.status(200).json({ productId });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
})

productsRouter.post('/', async (req, res) => {
    try {
        const response = await productsManager.createOne(req.body);
        res.status(200).json({ message: 'Producto añadido correctamente', product: response })
    } catch (error) {
        res.status(500).json({ error: errorr.message });
    }

})

productsRouter.put('/:pid', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await productsManager.updateOne(id, req.body)
        res.status(200).json({ message: 'Producto añadido correctamente', response })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

})

productsRouter.delete('/:pid', async (req, res) => {
    const { id } = req.params;
    try {
        await productsManager.deleteOne(id)
        res.status(200).json({ message: 'Producto eliminado correctamente' })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

})

export default productsRouter