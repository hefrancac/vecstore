// nike-clone-backend/middleware/authMiddleware.js

import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
    let token;

    // 1. O token é enviado no cabeçalho 'Authorization' como 'Bearer [TOKEN]'
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // 2. Pega apenas o token (remove o 'Bearer ')
            token = req.headers.authorization.split(' ')[1];

            // 3. Verifica o token usando o MESMO segredo do .env
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 4. Encontra o usuário pelo ID do token e anexa ao 'req'
            // (Remove a senha da requisição por segurança)
            req.user = await User.findById(decoded.id).select('-password');

            next(); // Passa para a próxima rota
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Não autorizado, token falhou.');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Não autorizado, sem token.');
    }
});

export { protect };