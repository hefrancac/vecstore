// nike-clone-backend/routes/orderRoutes.js (CORRIGIDO - ERRO 500)

import express from 'express';
import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import { protect } from '../middleware/authMiddleware.js'; 

const router = express.Router();

// @desc    Criar um novo pedido
// @route   POST /api/orders
// @access  Privado (requer login)
router.post(
    '/',
    protect, 
    asyncHandler(async (req, res) => {
        // 1. Pega os dados do Front-End (o orderItems já vem limpo)
        const {
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        } = req.body;

        if (!orderItems || orderItems.length === 0) {
            res.status(400);
            throw new Error('Nenhum item no pedido');
        }

        // 2. Cria o novo objeto de Pedido
        const order = new Order({
            user: req.user._id, // Pega o ID do usuário logado
            
            // --- CORREÇÃO AQUI ---
            // Removemos o .map() redundante. 
            // O Front-End já formatou o array 'orderItems' perfeitamente.
            orderItems: orderItems, 
            // --- FIM DA CORREÇÃO ---

            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });

        // 3. Salva no banco de dados
        const createdOrder = await order.save();

        // 4. Retorna o pedido criado para o Front-End
        res.status(201).json(createdOrder);
    })
);

export default router;