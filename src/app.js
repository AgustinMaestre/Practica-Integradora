import express from "express";
import handlebars from "express-handlebars"
import { __dirname } from "./utils.js"
import producstRouter from "./routes/products.router.js"
import cartsRouter from './routes/carts.router.js'
import viewsRouter from './routes/views.router.js'
import messagesRouter from './routes/messages.router.js'
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
app.use('/api/messages', messagesRouter)
app.use('/', viewsRouter)

app.listen(8080, () => {
    console.log("Escuchando al puerto 8080")
})