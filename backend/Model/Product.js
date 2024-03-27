import mongoose from 'mongoose';
import Category from './Category.js';

const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Product name is required.'],
        validate: {
            validator: v => /\S/.test(v),
            message: 'Product name cannot be empty or contain only whitespaces.',
        },
    },
    description: {
        type: String,
        required: [true, 'Product description is required.'],
        validate: {
            validator: v => /\S/.test(v),
            message: 'Product description cannot be empty or contain only whitespaces.',
        },
    },
    price: {
        type: Number,
        required: [true, 'Product price is required.'],
        validate: {
            validator: v => v > 0,
            message: 'Product price must be greather than 0.',
        },
    },
    weight: {
        type: Number,
        required: [true, 'Product weight is required.'],
        validate: {
            validator: v => v > 0,
            message: 'Product weight must be greather than 0.',
        },
    },
    category: {
        type: Category.schema,
        required: [true, 'Product category is required.'],
    },
});

const Product = mongoose.model('Product', productSchema);

export default Product;
