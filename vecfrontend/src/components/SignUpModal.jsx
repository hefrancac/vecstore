// src/components/SignUpModal.jsx (FINALIZADO PARA CONEXÃO COM API)

import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios'; // 1. Importar axios para a chamada da API
import './SignUpModal.css'; 

const SignUpModal = ({ isOpen, closeModal }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(''); // Para mensagens de erro/sucesso

    if (!isOpen) return null;

    // 2. Função que lida com o envio do formulário
    const submitHandler = async (e) => {
        e.preventDefault(); // Impede o recarregamento da página

        if (password !== confirmPassword) {
            setMessage('Senhas não coincidem!');
            return;
        }

        try {
            setMessage('Aguarde...');
            // 3. Chamada à nova API de Registro
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const { data } = await axios.post(
                'http://localhost:5000/api/users',
                { name, email, password },
                config
            );

            // 4. Sucesso!
            setMessage('Cadastro realizado com sucesso! Você está logado.');
            // Normalmente você salvaria o token aqui e recarregaria o header
            console.log('Usuário registrado e token recebido:', data.token);
            
            // Fecha o modal após um pequeno atraso
            setTimeout(closeModal, 1500); 

        } catch (error) {
            // 5. Trata erros da API
            setMessage(error.response && error.response.data.message
                ? error.response.data.message
                : error.message);
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
                    <h2>Cadastre-se e Ganhe 10% OFF!</h2>
                    <p>Entre para o nosso time e receba as novidades e ofertas exclusivas por e-mail.</p>
                    
                    {/* Exibe mensagens de erro ou sucesso */}
                    {message && <div className="modal-message">{message}</div>}

                    {/* 6. Adicionar os inputs para Nome e Confirmar Senha */}
                    <form onSubmit={submitHandler} className="signup-form">
                        <input 
                            type="text" 
                            placeholder="Nome Completo" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            required 
                        />
                        <input 
                            type="email" 
                            placeholder="Seu Melhor E-mail" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                        <input 
                            type="password" 
                            placeholder="Crie uma Senha" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                        <input 
                            type="password" 
                            placeholder="Confirme a Senha" 
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                            required 
                        />
                        
                        <button type="submit" className="modal-cta-btn">
                            Quero o Desconto!
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default SignUpModal;