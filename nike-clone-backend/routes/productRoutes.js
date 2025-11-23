// nike-clone-backend/routes/productRoutes.js

import express from 'express';
import Product from '../models/productModel.js';

const router = express.Router();

// @desc    Buscar produtos (COM LÓGICA DE MASCULINO/FEMININO)
// @route   GET /api/products
// @access  Público
router.get('/', async (req, res) => {
    try {
        let filter = {};
        const queryCategory = req.query.category;

        if (queryCategory) {
            // LÓGICA NOVA: Verifica se o filtro é de Gênero
            if (queryCategory === 'Masculino' || queryCategory === 'Feminino') {
                // Se for Masculino/Feminino, buscamos no campo 'gender'
                // E incluímos também os produtos 'Unissex'
                filter = { 
                    gender: { $in: [queryCategory, 'Unissex'] } 
                };
            } 
            // Senão, continua filtrando pela categoria normal (Corrida, Treino, etc.)
            else {
                filter = { category: queryCategory };
            }
        }

        const products = await Product.find(filter);
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor' });
    }
});


// @desc    BUSCA POR AUTOCOMPLETE (MANTIDO IGUAL)
// @route   GET /api/products/search
// @access  Público
router.get('/search', async (req, res) => {
    try {
        // 1. Pega o termo de busca da URL (ex: ?q=tênis)
        const query = req.query.q;

        if (!query) {
            return res.json([]);
        }

        // 2. Cria uma "Expressão Regular" (regex) para buscar
        const searchRegex = new RegExp(query, 'i');

        // 3. Busca no banco de dados
        const products = await Product.find({
            name: { $regex: searchRegex }
        })
        .limit(5); // 4. Limita a 5 resultados

        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor' });
    }
});


// @desc    Buscar um produto por ID (MANTIDO IGUAL)
// @route   GET /api/products/:id
// @access  Público
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Produto não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor' });
    }
});

export default router;