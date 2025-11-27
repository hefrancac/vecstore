// utils/seeder.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import Product from '../models/productModel.js';
import products from '../data/products.js';

dotenv.config();

connectDB();

const importData = async () => {
    try {
        // Limpa o banco de dados antes de inserir
        await Product.deleteMany();

        await Product.insertMany(products);

        console.log('✅ Dados importados com sucesso!');
        process.exit();
    } catch (error) {
        console.error(`❌ Erro ao importar dados: ${error.message}`);
        process.exit(1);
    }
};

// Para rodar este script, vamos adicionar um comando no package.json
// Se rodarmos `node utils/seeder.js -d` ele vai deletar os dados.
// Por enquanto, faremos apenas a importação.

importData();