const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Category = require('./Category');

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        validate: {
            validator: v => {
                return /\S/.test(v);
            }
        }
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        validate: {
            validator: v => {
                return v > 0;
            }
        }
    },
    weight: {
        type: mongoose.Types.Decimal128,
        required: true,
        validate: {
            validator: v => {
                return v > 0;
            }
        }
    },
    category: {
        type: Category.schema,
        required: true,
    },
})

module.exports = mongoose.model('Product', productSchema);