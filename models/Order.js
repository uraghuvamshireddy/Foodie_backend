const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    name:{
        type:String,    
        required:true
    },
    phoneNumber:{
         type:String,
         required:true

    },
    deliveryType:{
        type:String,
        required:true
    },
    addressorTable:{
        type:String
    },
    paymentOption: {
        type: String
    },
    items:{
        type: Array
    },
    totalPrice: {
        type: Number
    },
    completed:{
        type: Boolean,
        default:false
    },
    firm: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Firm'
        }]
});

const Order = mongoose.model('Order',orderSchema);
module.exports = Order
