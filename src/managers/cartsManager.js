import { cartsModel } from '../db/models/carts.model.js'

class CartsManager {
    async createCart() {
        const newCart = { products: [] };
        const response = await cartsModel.create(newCart);
        return response;
      }
    
      async findCartById(cId) {
        const response = await cartsModel
          .findById(cId)
          .populate("products.product", ["name", "price"]);
        return response;
      }
    async updateOne(cId, pId) {
            const cart = await cartsModel.findById(cId)
            const productIndex = cart.products.findIndex((p) => 
            p.product.equals(pId));
            console.log('productIndex', productIndex);
            if (productIndex === -1) {
                cart.products.push({ product: pId, quantity: 1})
            } else {
                cart.products[productIndex].quantity++
            }
            return cart.save()
    }
}

export const cartsManager = new CartsManager()