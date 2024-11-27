import express from "express"; //Importa o framework Express para criar a aplicação web
import multer from "multer"; // Importa o multer para lidar com os uploads de arquivos
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postscontroller.js"; //importa as funçoes controladoras para lidar com a logica dos posts
import cors from "cors";

const corsOptions ={
    origin:"http://localhost:8000",
    optionsSuccessStatus: 200

}
//Configura o armazenamento do multer para uploads de imagens
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    //Especifica o diretorio para armazenar as imagens enviadas
        cb(null, 'uploads/');// Substitua por seu caminho de upload desejado
    },
    filename: function (req, file, cb) {
        //Mantém o nome original do arquivo por simplicidade
        cb(null, file.originalname); //Considere usar uma estratégia de geração de nomes únicos para produção
    }
})
const upload = multer({ dest: "./uploads" , storage})



const routes = (app)  => {
    
    //Permite que o servidor interprete requisições com o corpo no formato json
    app.use(express.json());
    app.use(cors(corsOptions))
    //Rota para buscar todos os posts
    app.get("/posts", listarPosts);

    //Rota para criar um post
    app.post("/posts", postarNovoPost); //chama a funçao controladora para criaçao de posts
    
    //Rota para upload de imagens (assumindo uma unica imagem chamada "imagem")
    app.post("/upload", upload.single("imagem"), uploadImagem ); //chama a funçao controladora para processamento da imagem
    
    app.put("/upload/:id", atualizarNovoPost)
};

export default routes;