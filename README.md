# V&C | Vault & Campolina Store

![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=CONCLUIDO&color=GREEN&style=for-the-badge)
![Homepage do V&C](homepage-screenshot.jpg)

**V&C (Vault & Campolina)** é uma plataforma de e-commerce Full-Stack premium focada em moda e vestuário exclusivo. O projeto oferece uma experiência de compra digital completa, moderna e segura, desde a navegação pelo catálogo até o fechamento do pedido.

Este projeto demonstra uma arquitetura robusta utilizando a stack **MERN** (MongoDB, Express, React, Node.js).

---

## ✨ Funcionalidades Principais

Aqui está o que a plataforma V&C é capaz de fazer:

### 🛍️ Experiência de Compra
* **Catálogo Premium:** Visualização de produtos de alta qualidade carregados dinamicamente do banco de dados.
* **Filtros por Categoria:** Navegação fluida entre coleções (ex: Casual, Treino, Corrida).
* **Página de Produto Detalhada:**
    * Galeria de imagens interativa.
    * Seletores de tamanho e cor.
    * Botões de ação rápida (Favoritar e Adicionar ao Carrinho).
* **Busca Inteligente:** Barra de pesquisa com *autocomplete* que encontra produtos instantaneamente.

### 🛒 Carrinho e Checkout
* **Carrinho Slide-In:** Adicione itens e gerencie quantidades sem sair da página atual (painel lateral).
* **Fluxo de Checkout Completo:**
    1.  **Autenticação:** Login obrigatório para segurança.
    2.  **Endereço:** Formulário para dados de entrega.
    3.  **Pagamento:** Seleção de método de pagamento.
    4.  **Revisão:** Resumo final com cálculo de totais.

### 👤 Usuário e Segurança
* **Autenticação Segura:** Login e Cadastro com criptografia de senha (`bcrypt`) e tokens de sessão (`JWT`).
* **Wishlist (Lista de Desejos):** Salve seus itens favoritos (sincronizado com o banco de dados).
* **Perfil:** Cabeçalho personalizado identificando o usuário logado.

---

## 🛠️ Tecnologias Utilizadas

O projeto foi construído como um Monorepo dividido em duas partes principais:

### **Back-End (`vecbackend`)**
* **Node.js & Express:** Servidor e API RESTful.
* **MongoDB & Mongoose:** Banco de dados NoSQL na nuvem (Atlas).
* **JWT (JSON Web Tokens):** Segurança das rotas protegidas.
* **Dotenv:** Gerenciamento de variáveis de ambiente.

### **Front-End (`vecfrontend`)**
* **React.js (Vite):** Interface de usuário rápida e reativa.
* **Context API:** Gerenciamento de estado global (Usuário, Carrinho, Wishlist).
* **React Router DOM:** Navegação entre páginas (SPA).
* **Axios:** Comunicação HTTP com o servidor.
* **CSS Modules/Custom:** Estilização responsiva e design system próprio.

---

## 🚀 Como Rodar o Projeto Localmente

Siga estes passos para ter a loja V&C rodando no seu computador:

### Pré-requisitos
* [Node.js](https://nodejs.org/) instalado.
* Uma conta no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (para o banco de dados).
* [Git](https://git-scm.com/) instalado.

### 1. Clonar o Repositório

```bash
git clone https://github.com/hefrancac/vecstore.git
cd vecstore
2. Configurar o Back-End
Abra o terminal na pasta do servidor:

Bash

cd vecbackend

# Instale as dependências
npm install
Configuração das Variáveis de Ambiente (.env): Crie um arquivo chamado .env dentro da pasta vecbackend e adicione o seguinte:

Snippet de código

PORT=5000
MONGO_URI=sua_string_de_conexao_do_mongodb_atlas
JWT_SECRET=coloque_uma_chave_secreta_aleatoria_aqui
Popular o Banco de Dados (Obrigatório na primeira vez):

Bash

npm run data:import
Inicie o Servidor:

Bash

npm run server
O servidor rodará em http://localhost:5000

3. Configurar o Front-End
Abra um novo terminal e navegue para a pasta do front-end:

Bash

cd vecfrontend

# Instale as dependências
npm install

# Inicie o projeto React
npm run dev
O site rodará em http://localhost:5173

📂 Estrutura de Pastas
/
├── vecbackend/         # Lógica do Servidor, API e Banco de Dados
│   ├── config/         # Conexão DB
│   ├── data/           # Produtos iniciais
│   ├── models/         # Modelos (User, Product, Order)
│   ├── routes/         # Rotas da API
│   └── server.js       # Entrada da API
│
└── vecfrontend/        # Interface do Usuário (React)
    ├── public/         # Imagens e ícones
    └── src/
        ├── components/ # Header, Footer, Cards, Modais
        ├── context/    # Lógica global (Auth, Cart)
        └── screens/    # Páginas (Home, Product, Checkout)

Desenvolvido por Henrique França.
