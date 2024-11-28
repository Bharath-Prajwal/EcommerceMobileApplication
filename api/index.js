const express=require('express');
const mongoose=require('mongoose');
const bodyparser=require('body-parser');
const crypto=require('crypto');
const nodemailer=require('nodemailer');

const app=express();
const port=8000;
const cors=require('cors');


app.use(cors());
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.use(express.json());

const jwt=require('jsonwebtoken');

mongoose.connect("mongodb://127.0.0.1:27017/Ecommerce")
.then(()=>{
    console.log("connected to mongo");
})
.catch((err)=>{
    console.log("error in connection",err);

})
app.listen(port,()=>{
    console.log(`server is running at ${port}`);
})

const User=require('./models/user')

app.post("/users", async(req,res)=>{
    try{
        const {mail,name,password}=req.body;
        if (!mail || !name || !password) {
            return res.status(400).json({ message: 'Email, name, and password are required.' });
          }
        const newUser= new User({mail,name,password});
        const existingUser= await User.findOne({mail:mail});
        if(existingUser){
            return res.status(401).json({message: "User Alredy Exists"})
        }
        newUser.save();
        res.status(200).json({message: "Success"});
    }
    catch(err){
        console.log(err)
        res.status(500).json({message: "Registration failed"});
    }

})

const generateSecretKey=()=>{
    const secretkey=crypto.randomBytes(32).toString("hex");
    return secretkey;
}
const secretkey=generateSecretKey();
app.post("/login", async(req,res)=>{
    try{
        const {mail,password}=req.body;
        
        if (!mail ||  !password) {
            return res.status(400).json({ message: 'Email, name, and password are required.' });
          }
        const user=await User.findOne({mail});
        
        if(!user){
            return res.status(401).json({message: "User not found"})
        }
        
        if(user.password !== password){
            return res.status(403).json({message: "Invalid pasword"})
        }
        
        res.status(200).json({message: "Success",data: user})

    }
    catch(err){
        console.log(err)
        res.status(800).json({message: "Login failed"})
    }
})




//        HANDLING CART

const CartDetails=require('./models/cart');
app.post('/pushtocart',async(req,res)=>{
    try{
        const {mail,image,title,price}=req.body;
        
        const newCartDetails=new CartDetails({mail,image,title,price});
        newCartDetails.save();
        res.status(200).json({message: "Successfully added to cart"});
    }catch(err){
        console.log(err);
    }
})



app.post('/popfromcart',async(req,res)=>{
    try{
        const {mail}=req.body;
        
        const cartItems=await CartDetails.find({mail:mail});
        
        res.status(200).json({message: "Success",data: cartItems})
    }catch(err){
        console.log(err);
    }
})


app.delete("/delete/:id",async(req,res)=>{
    const id = req.params.id;
    
        const result = await CartDetails.findByIdAndDelete(id);
    try{
        if (result) {
            res.status(200).json({ message: 'Item deleted successfully' });
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting item', error });
    }
})


app.put('/updateQuantity', async (req, res) => {
    const { id, quantity } = req.body;
    try {
        // Update the quantity for the given item ID
        const result = await CartDetails.findByIdAndUpdate(id, { quantity }, { new: true });

        if (result) {
            res.status(200).json({ message: 'Quantity updated successfully', item: result });
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating quantity', error });
    }
});

module.exports=app