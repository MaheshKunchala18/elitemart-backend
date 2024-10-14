import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            },
            orderDate: {
                type: Date,
                default: Date.now
            }
        }
    ]
}, { collection: 'orders' });

const Order = mongoose.model('Order', orderSchema);

export default Order;
