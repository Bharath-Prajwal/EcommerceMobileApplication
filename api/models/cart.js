const mongoose=require('mongoose');

const cartSchema= new mongoose.Schema({
    mail:String,
    image:String,
    title:String,
    price:Number,
    quantity:{type:Number,default:1}
});


const Cart = mongoose.model('Cart', cartSchema);

module.exports =Cart