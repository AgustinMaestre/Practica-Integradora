import { Router } from "express";
import { cartsManager } from "../managers/cartsManager.js";

const cartRouter = Router();

cartRouter.post('/', async (req, res) => {
    const newCart = await cartsManager.createCart()
    res.status(201).json({ message: 'Carrito creado', cart: newCart })
})

cartRouter.get('/:cid', async (req, res) => {
    const { id } = req.params;
    const cartId = await cartsManager.findCartById(id);
    if (!cartId) {
        res.status(404).json({message: 'ID del producto no encontrado'})
    } else {
        res.status(200).json({ message: 'Productos en el carrito', products: cartId.products })
    }
});

cartRouter.post('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const cart = await cartsManager.updateOne(cid, pid)
    res.status(201).json({message: 'Producto añadido al carrito', cart: cart})
})

export default cartRouter