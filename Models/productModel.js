import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 100
    },
    imageUrl: {
        type: String,
        required: true
    },
    originalPrice: {
        type: Number,
        required: true,
        min: 0
    },
    discountPrice: {
        type: Number,
        required: true,
        min: 0
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, { collection: 'products' });


const Product = mongoose.model('Product', productSchema);

export default Product;
