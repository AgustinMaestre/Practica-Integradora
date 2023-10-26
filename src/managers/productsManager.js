import { productsModel } from "../db/models/products.models.js";

class productsManager {
    async findAll() {
        try {
            const result = await productsModel.find()
            return result
        } catch (error) {
            return error
        }
    }
    async findById() {
        try {

        } catch (error) {
            return error
        }
    }
    async createOne() {
        try {

        } catch (error) {
            return error
        }
    }
    async updateOne() {
        try {

        } catch (error) {
            return error
        }
    }
    async deleteOne() {
        try {

        } catch (error) {
            return error
        }
    }
}