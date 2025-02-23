const Order = require('../models/Order');
const Firm = require('../models/Firm');
const path = require('path');

const orderItems = async(req,res)=>{
    try{
    const {name,phoneNumber,deliveryType,addressorTable,paymentOption,items,totalPrice} = req.body;
    const firmId = req.params.firmId;
       const firm = await Firm.findById(firmId);
       if (!firm) {
        res.status(404).json({ message: "Firm not found" })
        }

        const order = new Order({
            name,
            phoneNumber,
            deliveryType,
            addressorTable,
            paymentOption,
            items,
            totalPrice,
            firm:firm._id
        })

        const savedOrder = await order.save();
        firm.orders.push(savedOrder);
        await firm.save()

        res.status(200).json(savedOrder)
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" })
    }

}

const viewOrders = async(req,res)=>{
try{
    const firmId = req.params.firmId;
    const firm = await Firm.findById(firmId);
    if(!firm){
        res.status(404).json({ message: "Firm not found" })
    }
    const orders = await Order.find({firm: firmId});
res.status(200).json({orders});
}
catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" })   
}
}

module.exports = {orderItems,viewOrders};