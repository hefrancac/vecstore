// nike-clone-backend/models/orderModel.js

import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
    {
        // 1. Quem fez o pedido
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User', // Referência ao UserModel
        },
        // 2. O que foi comprado
        orderItems: [
            {
                name: { type: String, required: true },
                qty: { type: Number, required: true },
                image: { type: String, required: true },
                price: { type: Number, required: true },
                product: { // Referência ao produto original
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: 'Product',
                },
            },
        ],
        // 3. Onde entregar
        shippingAddress: {
            address: { type: String, required: true },
            city: { type: String, required: true },
            postalCode: { type: String, required: true },
            country: { type: String, required: true },
        },
        // 4. Como pagou
        paymentMethod: {
            type: String,
            required: true,
        },
        // 5. Resumo financeiro (calculado no Front-End, salvo no Back-End)
        itemsPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },
        taxPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },
        shippingPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },
        totalPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },
        // 6. Status (para o futuro)
        isPaid: {
            type: Boolean,
            required: true,
            default: false,
        },
        paidAt: {
            type: Date,
        },
        isDelivered: {
            type: Boolean,
            required: true,
            default: false,
        },
        deliveredAt: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;