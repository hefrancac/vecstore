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

        // Lógica de Negócio: O back-end decide como interpretar o filtro que vem da URL
        if (queryCategory) {
            
            // Tratamento especial para Gênero: Quem busca 'Masculino' também deve ver 'Unissex'
            if (queryCategory === 'Masculino' || queryCategory === 'Feminino') {
                filter = { 
                    gender: { $in: [queryCategory, 'Unissex'] } 
                };
            } 
            // Filtragem padrão por categoria (ex: Adesivos, Acessórios)
            else {
                filter = { category: queryCategory };
            }
        }

        // Busca no MongoDB aplicando o filtro construído acima
        const products = await Product.find(filter);
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor' });
    }
});


// @desc    BUSCA POR AUTOCOMPLETE
// @route   GET /api/products/search
// @access  Público
router.get('/search', async (req, res) => {
    try {
        const query = req.query.q;

        if (!query) {
            return res.json([]);
        }

        // Flexibilidade: Regex 'i' torna a busca case-insensitive (ignora maiúsculas/minúsculas)
        const searchRegex = new RegExp(query, 'i');

        // Performance: Limitamos a busca a 5 itens para não sobrecarregar o render do autocomplete
        const products = await Product.find({
            name: { $regex: searchRegex }
        })
        .limit(5); 

        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor' });
    }
});


// @desc    Buscar um produto por ID
// @route   GET /api/products/:id
// @access  Público
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        
        // Validação: Garante retorno 404 se o ID não existir no banco
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