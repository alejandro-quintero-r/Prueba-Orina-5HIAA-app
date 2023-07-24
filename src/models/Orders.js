const {Schema, model} = require('mongoose');

const OrdersSchema = Schema({
    userID: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    hour: {
        type: String,
        required: true
    }, 
    observation : {
        type: String
    },
    completed : {
        type : Boolean, 
        default: false,
    }, 
    physicianName : {
        type : String
    }      
},{
        timestamps: true
});

module.exports = model('Orders', OrdersSchema);