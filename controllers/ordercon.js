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
       const com = false;
        const order = new Order({
            name,
            phoneNumber,
            deliveryType,
            addressorTable,
            paymentOption,
            items,
            totalPrice,
            com,
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

const comorder = async(req,res)=>{
    try {
        const { orderId } = req.params;
    
        const updatedOrder = await Order.findByIdAndUpdate(
          orderId,
          { completed: true },
          { new: true }
        );
    
        if (!updatedOrder) {
          return res.status(404).json({ message: "Order not found" });
        }
    
        res.json({ message: "Order marked as completed", order: updatedOrder });
      } catch (error) {
        console.error("Error updating order:", error);
        res.status(500).json({ message: "Internal server error" });
      }
}

module.exports = {orderItems,viewOrders,comorder};