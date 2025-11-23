// nike-clone-backend/models/productModel.js

import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
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

        // --- NOVO CAMPO: GÊNERO (Masculino / Feminino) ---
        gender: { 
            type: String, 
            required: false, 
            default: 'Unissex',
            enum: ['Masculino', 'Feminino', 'Unissex'] 
        },
        // -------------------------------------------------

        price: {
            type: Number,
            required: [true, "Por favor, adicione um preço"],
            default: 0,
        },
        image: { // A imagem de capa
            type: String,
            required: [true, "Por favor, adicione uma URL de imagem"],
        },
        
        // Campo da Galeria (Mantido)
        images: {
            type: [String], 
            default: [],
        },

        badge: { 
            type: String,
            default: '',
        },
        
        searchName: {
            type: String,
            index: true,
        },

        // Campo de Cores (Mantido)
        colors: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

// Lógica de Pré-Salvamento (Mantida igual)
productSchema.pre('save', function(next) {
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