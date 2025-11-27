// src/components/LoginModal.jsx

import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';
import './SignUpModal.css'; // Reutilizamos o CSS do modal de cadastro

// Recebe 'isOpen', 'closeModal', e 'onLoginSuccess'
const LoginModal = ({ isOpen, closeModal, onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    if (!isOpen) return null;

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            setMessage('Aguarde...');
            const config = { headers: { 'Content-Type': 'application/json' } };

            // Chamada à API de Login
            const { data } = await axios.post(
                'http://localhost:5000/api/users/login',
                { email, password },
                config
            );

            // Sucesso!
            setMessage('Login bem-sucedido!');
            onLoginSuccess(data); // Salva o usuário no Context e LocalStorage
            
            setTimeout(closeModal, 500); 

        } catch (error) {
            setMessage(error.response && error.response.data.message
                ? error.response.data.message
                : 'Erro ao conectar. Tente novamente.');
        }
    };

    return (
        <>
            <div className="modal-backdrop" onClick={closeModal}></div>
            <div className="signup-modal"> 
                <button onClick={closeModal} className="modal-close-btn">
                    <FaTimes />
                </button>
                
                <div className="modal-content">
                    <h2>Entre na Sua Conta</h2>
                    <p>Acesse seu perfil, pedidos e lista de desejos.</p>
                    
                    {message && <div className="modal-message">{message}</div>}

                    <form onSubmit={submitHandler} className="signup-form">
                        <input 
                            type="email" 
                            placeholder="Seu E-mail" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                        <input 
                            type="password" 
                            placeholder="Sua Senha" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                        
                        <button type="submit" className="modal-cta-btn">
                            Entrar
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default LoginModal;