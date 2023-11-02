import express from "express";
import handlebars from "express-handlebars"
import { __dirname } from "./utils.js"
import producstRouter from "./routes/products.router.js"
import cartsRouter from './routes/carts.router.js'
import viewsRouter from './routes/views.router.js'
import { messagesManager } from "./managers/messagesManager.js";
import { Server } from "socket.io";
import "./db/configDB.js"

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true}))
app.use(express.static(__dirname + '/public'))

app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")

app.use("/api/products", producstRouter)
app.use('/api/carts', cartsRouter)
app.use('/', viewsRouter)

app.listen(8080, () => {
    console.log("Escuchando al puerto 8080")
})

const socketServer = new Server(httpServer);
socketServer.on("connection", (socket) => {
  socket.on("newMessage", async(message) => {
    await messagesManager.createOne(message)
    const messages = await messagesManager.findAll()
    socketServer.emit("sendMessage", messages);
  });

  /*socket.on("newPrice", (value) => {
    socket.broadcast.emit("priceUpdated", value);
  });

  socket.on("showProducts", async(req,res) => {
    const products = await manager.getProducts({})
    socket.emit("sendProducts", products);
  });

  socket.on("addProduct", async(product) => {
    await manager.addProduct(product.title,product.description,product.price,product.thumbnail,product.code,product.stock)
    const products = await manager.getProducts({})
    socketServer.emit("productUpdated", products);
  });

  socket.on("deleteProduct", async(id) => {
    await manager.deleteProduct(+id)
    const products = await manager.getProducts({})
    socketServer.emit("productUpdated", products);
  });*/
});