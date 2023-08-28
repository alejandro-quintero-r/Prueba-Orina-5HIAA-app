const {Schema, model} = require('mongoose');

const OrdersSchema = Schema({
    userID: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: false
    },
    hour: {
        type: String,
        required: false
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