// nike-clone-backend/server.js (CORRIGIDO)

// SEGURANÇA: Garante que senhas e chaves de API (.env) sejam carregadas antes de tudo
import 'dotenv/config'; 

import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

// INFRAESTRUTURA: Inicializa a conexão com o cluster MongoDB (NoSQL)
connectDB();

const app = express();

// ARQUITETURA DESACOPLADA: O CORS permite que o Front-end (React) em outra porta consuma esta API
app.use(cors()); 

// PADRÃO REST: Middleware essencial para o servidor interpretar JSON vindo das requisições
app.use(express.json()); 

app.get('/', (req, res) => {
    res.send('API está funcionando...');
});

// ORGANIZAÇÃO MODULAR: As rotas são segregadas por contexto (Produtos, Usuários, Pedidos) para facilitar manutenção
app.use('/api/products', productRoutes); 
app.use('/api/users', userRoutes);       
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000;

// EVENT LOOP: O servidor Node fica ativo escutando as requisições na porta definida
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});