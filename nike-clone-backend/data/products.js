// nike-clone-backend/data/products.js (LISTA FINAL DE 15 PRODUTOS)

const products = [
    // --- NOVOS PRODUTOS NIKE (5 ITENS - TREINO) ---
    {
        name: 'Camiseta Nike Dri-FIT "Just Do It"',
        description: 'Tecido leve e respirável com tecnologia Dri-FIT que afasta o suor. Gráfico icônico "Just Do It" no peito.',
        category: 'Treino',
        gender: 'Masculino',
        price: 199.90,
        image: '/images/products/camiseta_justdoit_nike_frente.jpg',
        images: [
            '/images/products/camiseta_justdoit_nike_frente.jpg',
            '/images/products/camiseta_justdoit_nike_tras.jpg'
        ],
        badge: 'Nike Training',
        colors: ['Preto'],
    },
    {
        name: 'Regata Nike Pro Combat (Cinza)',
        description: 'Regata de compressão com tecnologia Pro Combat. Ideal para alta performance e suporte muscular.',
        category: 'Treino',
        gender: 'Masculino',
        price: 149.90,
        image: '/images/products/regata_nike_frente.jpg',
        images: [
            '/images/products/regata_nike_frente.jpg',
            '/images/products/regata_nike_tras.jpg'
        ],
        badge: 'Nike Pro',
        colors: ['Cinza'],
    },
    {
        name: 'Camiseta Nike Pro de Compressão',
        description: 'Camiseta de compressão de manga curta, mantém o corpo seco e fresco durante exercícios intensos.',
        category: 'Treino',
        gender: 'Masculino',
        price: 249.90,
        image: '/images/products/camiseta_nike_pro_frente.jpg',
        images: [
            '/images/products/camiseta_nike_pro_frente.jpg',
            '/images/products/camiseta_nike_pro_tras.jpg'
        ],
        badge: 'Nike Pro',
        colors: ['Preto'],
    },
    {
        name: 'Camiseta Nike Básica Branca',
        description: 'Camiseta leve com ajuste padrão. Perfeita para qualquer tipo de treino ou uso diário.',
        category: 'Treino',
        gender: 'Masculino',
        price: 129.90,
        image: '/images/products/camiseta_nike_branca_frente.jpg',
        images: [
            '/images/products/camiseta_nike_branca_frente.jpg',
            '/images/products/camiseta_nike_branca_tras.jpg'
        ],
        badge: 'Básica',
        colors: ['Branco'],
    },
    {
        name: 'Camiseta Nike Azul Logo',
        description: 'Camiseta Azul Marinho em algodão macio. Estampa de logo grande e corte confortável.',
        category: 'Treino',
        gender: 'Masculino',
        price: 159.90,
        image: '/images/products/camiseta_nike_azul_frente.jpg',
        images: [
            '/images/products/camiseta_nike_azul_frente.jpg',
            '/images/products/camiseta_nike_azul_tras.jpg'
        ],
        badge: 'Novo',
        colors: ['Azul Marinho'],
    },


    // --- PRODUTOS PREMIUM EXISTENTES (10 ITENS - CASUAL) ---
    {
        name: 'Camiseta Balenciaga Back Medium (Cinza)',
        description: 'Camiseta cinza com efeito estonado e logo Balenciaga nas costas. Corte médio.',
        category: 'Casual',
        gender: 'Masculino',
        price: 2100.00,
        image: '/images/products/balenciaga_back_medium_frente.jpg',
        images: [
            '/images/products/balenciaga_back_medium_frente.jpg',
            '/images/products/balenciaga_back_medium_tras.jpg'
        ],
        badge: 'Balenciaga',
        colors: ['Cinza'],
    },
    {
        name: 'Camiseta Balenciaga Back Medium (Preto)',
        description: 'Camiseta preta desbotada com logo Balenciaga nas costas. Corte médio.',
        category: 'Casual',
        gender: 'Masculino',
        price: 2100.00,
        image: '/images/products/balenciaga_back_medium_preto_frente.jpg',
        images: [
            '/images/products/balenciaga_back_medium_preto_frente.jpg',
            '/images/products/balenciaga_back_medium_preto_tras.jpg'
        ],
        badge: 'Balenciaga',
        colors: ['Preto'],
    },
    {
        name: 'Diesel T-Boxt-Den T-shirt',
        description: 'Camiseta cinza com decote careca, mangas curtas e acabamento canelado. Composição: 100% algodão.',
        category: 'Casual',
        gender: 'Masculino',
        price: 649.90,
        image: '/images/products/diesel_tboxtden_tshirt.png',
        images: ['/images/products/diesel_tboxtden_tshirt.png'],
        badge: 'Diesel',
        colors: ['Cinza'],
    },
    {
        name: 'Diesel Camiseta S-cooler-L1',
        description: 'Camiseta preta com decote careca e patch de logo frontal. Composição: 100% algodão.',
        category: 'Casual',
        gender: 'Masculino',
        price: 519.90,
        image: '/images/products/diesel_scoolerl1_frente.jpg',
        images: [
            '/images/products/diesel_scoolerl1_frente.jpg',
            '/images/products/diesel_scoolerl1_modelo.jpg',
            '/images/products/diesel_scoolerl1_costas.jpg'
        ],
        badge: 'Diesel',
        colors: ['Preto'],
    },
    {
        name: 'Balenciaga Moletom Tape Type',
        description: 'Moletom preto com capuz clássico, ombros deslocados e detalhe desgastado.',
        category: 'Casual',
        gender: 'Masculino',
        price: 6890.90,
        image: '/images/products/balenciaga_tapetype_frente.jpg',
        images: [
            '/images/products/balenciaga_tapetype_frente.jpg',
            '/images/products/balenciaga_tapetype_lado.jpg'
        ],
        badge: 'Balenciaga',
        colors: ['Preto'],
    },
    {
        name: 'Balenciaga Suéter com Logo',
        description: 'Suéter preto produzido na Itália. Decote careca, mangas longas e bordado de logo.',
        category: 'Casual',
        gender: 'Masculino',
        price: 5790.00,
        image: '/images/products/balenciaga_sweater_frente.jpg',
        images: [
            '/images/products/balenciaga_sweater_frente.jpg',
            '/images/products/balenciaga_sweater_modelo1.jpg',
            '/images/products/balenciaga_sweater_costas.jpg',
            '/images/products/balenciaga_sweater_modelo2.jpg'
        ],
        badge: 'Balenciaga',
        colors: ['Preto'],
    },
    {
        name: 'Balenciaga Moletom Lamborghini',
        description: 'Moletom com capuz Automobili Lamborghini. Preto, motivo Lamborghini Shield.',
        category: 'Casual',
        gender: 'Masculino',
        price: 6290.00,
        image: '/images/products/balenciaga_lamborghini_hoodie.jpg',
        images: ['/images/products/balenciaga_lamborghini_hoodie.jpg'],
        badge: 'Exclusivo',
        colors: ['Preto'],
    },
    {
        name: 'Calça Jeans Oversized Dark Wash',
        description: 'Jeans de modelagem ampla (oversized) com lavagem escura e detalhes na costura. Possui cordão ajustável na cintura.',
        category: 'Casual',
        gender: 'Masculino',
        price: 3890.00,
        image: '/images/products/calca_oversized_dark_frente.jpg',
        images: [
            '/images/products/calca_oversized_dark_frente.jpg',
            '/images/products/calca_oversized_dark_tras.jpg'
        ],
        badge: 'Balenciaga',
        colors: ['Azul Escuro Desbotado'],
    },
    {
        name: 'Calça Cargo Balenciaga Large',
        description: 'Calça cargo oversized em preto. Design utilitário com múltiplos bolsos e ajuste largo.',
        category: 'Casual',
        gender: 'Masculino',
        price: 4590.00,
        image: '/images/products/balenciaga_cargo_large_frente.jpg',
        images: [
            '/images/products/balenciaga_cargo_large_frente.jpg',
            '/images/products/balenciaga_cargo_large_tras.jpg'
        ],
        badge: 'Novo',
        colors: ['Preto'],
    },
    {
        name: 'Jeans Baggy Patched Pockets',
        description: 'Jeans azul com lavagem vintage e bolsos traseiros em destaque. Modelagem baggy confortável.',
        category: 'Casual',
        gender: 'Masculino',
        price: 890.00,
        image: '/images/products/jeans_baggy_patched_frente.jpg',
        images: [
            '/images/products/jeans_baggy_patched_frente.jpg',
            '/images/products/jeans_baggy_patched_tras.jpg'
        ],
        badge: 'Novo',
        colors: ['Azul'],
    }
];

export default products;