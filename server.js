import express from "express";
import routes from "./src/routes/postsroutes.js";

const app = express();
app.use(express.static("uploads"))
routes(app)

// inicia o servidor na porta 3000 e exibe uma mensagem no console
app.listen(3000,  ()  => {
    console.log("Servidor Escutando...");
});





