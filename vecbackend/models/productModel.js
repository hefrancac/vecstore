// nike-clone-backend/models/productModel.js

import mongoose from 'mongoose';

// MODELAGEM DE DADOS (ODM): Utilizamos o Mongoose para impor uma estrutura rígida e tipada sobre a flexibilidade do NoSQL
const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            // VALIDAÇÃO BACK-END: Mensagens de erro personalizadas que retornam direto para a API caso falte dados
            required: [true, "Por favor, adicione um nome ao produto"],
        },
        description: {
            type: String,
            required: [true, "Por favor, adicione uma descrição"],
        },
        category: {
            type: String,
            required: [true, "Por favor, adicione uma categoria"],
        },

        // CONSISTÊNCIA DE DADOS: O uso de ENUM restringe a entrada, impedindo erros de digitação no banco (ex: 'masc' vs 'Masculino')
        gender: { 
            type: String, 
            required: false, 
            default: 'Unissex',
            enum: ['Masculino', 'Feminino', 'Unissex'] 
        },
        
        price: {
            type: Number,
            required: [true, "Por favor, adicione um preço"],
            default: 0,
        },
        
        // ESTRUTURA LEVE: Armazenamos apenas a URL (String) da imagem hospedada, não o arquivo binário, mantendo o banco rápido
        image: { 
            type: String,
            required: [true, "Por favor, adicione uma URL de imagem"],
        },
        
        images: {
            type: [String], 
            default: [],
        },

        badge: { 
            type: String,
            default: '',
        },
        
        // PERFORMANCE DE BUSCA: O parâmetro 'index: true' otimiza a leitura deste campo pelo motor do MongoDB
        searchName: {
            type: String,
            index: true,
        },

        colors: {
            type: [String],
            default: [],
        },
    },
    {
        // AUDITORIA AUTOMÁTICA: Cria e gerencia os campos 'createdAt' e 'updatedAt' sem intervenção manual
        timestamps: true,
    }
);

// MIDDLEWARE DE BANCO: Função 'pre-save' que intercepta os dados antes de gravar
productSchema.pre('save', function(next) {
    // UX NA BUSCA: Normaliza o texto (remove acentos/caixa alta) automaticamente para facilitar buscas futuras
    if (this.isModified('name') || this.isNew) {
        const removeDiacritics = (text) => {
            return text
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "");
        };
        this.searchName = removeDiacritics(this.name).toLowerCase();
    }
    next();
});

const Product = mongoose.model('Product', productSchema);
export default Product;