const {Schema, model} = require('mongoose');

const ResultsSchema = Schema({

    result: {
        type: Number,
        required: true
    },
    observation: {
        type: String,
        required: true
    },
    orderId:{
        type: String,
        required: true
    }
},{
        timestamps: true
});

module.exports = model('Results', ResultsSchema);