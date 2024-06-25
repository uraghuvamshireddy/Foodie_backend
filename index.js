const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const vendorRoutes = require('./routes/vendorRoutes');
const bodyParser = require('body-parser');
const firmRoutes = require('./routes/firmRoutes');
const productRoutes = require('./routes/productRoutes');
const cors = require('cors');
const path = require('path');

const app = express();
dotenv.config();
const PORT = 4000;

mongoose.connect(process.env.MONGO_URI)
 .then(()=>console.log("MongoDB connected "))
 .catch((err)=>console.log(err));

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
 app.use('/vendor',vendorRoutes);
 app.use('/firm',firmRoutes);
 app.use('/product',productRoutes);
 app.use('/uploads',express.static('uploads'));

app.listen(PORT, ()=>{
    console.log(`server started at ${PORT}`)
})

app.use('/home',(req,res)=>{
 res.send("<h1> Welocome To Menu")
})