// config/db.js

import mongoose from 'mongoose';

const connectDB = async () => {
    console.log("--- DEBUG: config/db.js - DENTRO DA FUNÇÃO connectDB ---"); 

    try {
        const uri = process.env.MONGO_URI; 

        // ... (podemos remover os logs de debug agora se quisermos) ...
        console.log("---------------------------------");
        console.log("DEBUG: Iniciando conexão com o DB...");
        if (uri && uri.length > 10) { 
            console.log("DEBUG: process.env.MONGO_URI FOI ENCONTRADA.");
            console.log("DEBUG: Tentando conectar ao MongoDB Atlas...");
        } else {
            console.log("🚨 ERRO GRAVE: A VARIÁVEL 'MONGO_URI' ESTÁ VAZIA...");
            throw new Error('MONGO_URI não foi encontrada ou está vazia.');
        }
        
        // AQUI ESTÁ A MUDANÇA:
        // Removemos as opções depreciadas daqui
        const conn = await mongoose.connect(uri); 

        console.log(`✅ MongoDB Conectado: ${conn.connection.host}`);
    } catch (error) {
        console.error("❌ ERRO DE CONEXÃO COM O MONGODB ❌");
        console.error(`Mensagem: ${error.message}`);
        process.exit(1); 
    }
};

export default connectDB;