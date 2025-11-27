import express from 'express';
import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler'; // Tratamento de erros assíncronos sem try/catch repetitivo
import jwt from 'jsonwebtoken'; 
import { protect } from '../middleware/authMiddleware.js'; 

const router = express.Router();

// Segurança: Função auxiliar para gerar o Token JWT que mantém a sessão do usuário ativa
const generateToken = (id) => {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) throw new Error('JWT_SECRET não carregada no .env');
    return jwt.sign({ id }, jwtSecret, { expiresIn: '30d' });
};

// Cadastro
router.post('/', asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    
    // Validação: Impede duplicidade de e-mails no banco
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400); 
        throw new Error('Usuário já existe.');
    }

    // Criação: O model (Mongoose) cuidará do hash da senha antes de salvar
    const user = await User.create({ name, email, password });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id), // Retorna o token imediatamente para login automático
        });
    } else {
        res.status(400);
        throw new Error('Dados inválidos.');
    }
}));

// Login
router.post('/login', asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    // Autenticação: Verifica se o usuário existe e se a senha bate com o hash
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(401); 
        throw new Error('Email ou senha inválidos.');
    }
}));

// Wishlist (Adicionar)
// Middleware 'protect': Apenas usuários com Token válido acessam essa rota
router.post('/wishlist', protect, asyncHandler(async (req, res) => {
    const { productId } = req.body;
    const user = req.user; // O usuário vem do middleware 'protect'
    if (!user.wishlist) user.wishlist = [];

    // Lógica: Evita adicionar o mesmo produto duas vezes na lista
    const alreadyAdded = user.wishlist.find((item) => item.toString() === productId);
    if (!alreadyAdded) {
        user.wishlist.push(productId);
        await user.save();
        res.status(201).json({ message: 'Adicionado' });
    } else {
        res.json({ message: 'Já existe' });
    }
}));

// Wishlist (Remover)
router.delete('/wishlist/:id', protect, asyncHandler(async (req, res) => {
    const user = req.user;
    if (user.wishlist) {
        // Atualização de array no NoSQL (filtra o item fora)
        user.wishlist = user.wishlist.filter((item) => item.toString() !== req.params.id);
        await user.save();
    }
    res.json({ message: 'Removido' });
}));

// Wishlist (Listar)
router.get('/wishlist', protect, asyncHandler(async (req, res) => {
    // Relacionamento: O 'populate' troca o ID do produto pelos dados reais (nome, imagem, preço)
    const user = await User.findById(req.user._id).populate('wishlist');
    res.json(user.wishlist || []);
}));

export default router;