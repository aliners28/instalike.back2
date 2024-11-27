import 'dotenv/config';
import { ObjectId } from "mongodb"
import conectarAoBanco from "../config/dbconfig.js"//Conecta ao banco de dados usando a string de conexao fornecida
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO)
//Função assincrona para buscar todos os posts do banco de dados

export  async function getTodosPosts(){
    //Seleciona o banco de dados "imersao-instabytes"
    const db = conexao.db("imersao-instabytes")
    //Seleciona a coleção "posts" dentro do banco de dados
    const colecao = db.collection("posts")
    //Retorna uma array com todos os documentos da coleção
    return colecao.find().toArray()
}
export async function criarPost(novoPost) {

    const db = conexao.db("imersao-instabytes") //Seleciona o banco de dados "imersao-instabytes"
    const colecao = db.collection("posts") //Seleciona a coleção "posts" dentro do banco de dados
    return colecao.insertOne(novoPost) //Retorna uma array com todos os documentos da coleção
    }

    export async function atualizarPost(id, novoPost) {
        const db = conexao.db("imersao-instabytes") //Seleciona o banco de dados "imersao-instabytes"
        const colecao = db.collection("posts") //Seleciona a coleção "posts" dentro do banco de dados
        const objId = ObjectId.createFromHexString(id)
        return colecao.updateOne({_id: new ObjectId(objId)}, {$set:novoPost}) 
}