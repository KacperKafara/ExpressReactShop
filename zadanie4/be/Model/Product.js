import mongoose from 'mongoose';
import Category from './Category';

const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        validate: {
            validator: v => /\S/.test(v),
        },
    },
    description: {
        type: String,
        required: true,
        validate: {
            validator: v => /\S/.test(v),
        },
    },
    price: {
        type: Number,
        required: true,
        validate: {
            validator: v => v > 0,
        },
    },
    weight: {
        type: mongoose.Types.Decimal128,
        required: true,
        validate: {
            validator: v => v > 0,
        },
    },
    category: {
        type: Category.schema,
        required: true,
    },
});

const Product = mongoose.model('Product', productSchema);

export default Product;
