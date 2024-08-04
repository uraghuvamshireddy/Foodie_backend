const Vendor = require('../models/Vender');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();
const secretKey = process.env.JWT;

const vendorRegister = async(req,res)=>{
 const {username,email,password} = req.body;
 try{
    const vendorEmail = await Vendor.findOne({email});
    if(vendorEmail){
        return res.status(400).json("email already exists");
    }
    const hashpassword = await bcrypt.hashSync(password,10);
    console.log(hashpassword);
    const newVendor = new Vendor({
        username:username,
        email:email,
        password:hashpassword
    });
    await newVendor.save();
    res.status(201).json({message: "Vendor registered successfully"});
 }
 catch(err){
    console.log(err);
    res.status(500).json({err: "intrenal server error"});
 }
}

const vendorLogin = async(req,res)=>{
    const {email,password} = req.body;
    try{
        const vendor = await Vendor.findOne({email});
        if(!vendor || !(await bcrypt.compare(password,vendor.password))){
            return res.status(401).json({error: "Invalid usename or password" });
        }
        const vendorId = vendor._id;
        const token = jwt.sign({vendorId: vendor._id},secretKey, {expiresIn: "1h"});
        res.status(200).json({success: "Login successful",token,vendorId});
    }
    catch(err){
        console.log(err);
        res.status(500).json({err: "intrenal server error"});

    }
}

const getAllVendors = async(req,res)=>{
    try{
        const vendors = await Vendor.find().populate('firm');
        res.json({vendors});
    }catch(err){
        console.log(err);
        res.status(500).json({err: "intrenal server error"});
    }
}

const getVendorById = async(req,res)=>{
    const vendorId = req.params.id;
    try {
        const vendor = await Vendor.findById(vendorId).populate('firm');
        if(!vendor){
            return res.status(404).json({error: "Vendor not found"});

            
        }
    
      const vendorFirmId = vendor.firm[0]._id;
       res.status(200).json({vendorId,vendorFirmId});
       
    } catch (error) {
        console.log(error);
        res.status(500).json({err: "intrenal server error"});
    }
}

module.exports = {vendorRegister,vendorLogin,getAllVendors,getVendorById};