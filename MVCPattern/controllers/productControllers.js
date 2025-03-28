const Product=require('../models/productModel');

//business logic

const getProducts = async(req,res) => {
    try{
        const allProducts = await Product.find();

        if(!allProducts || allProducts.length === 0){
            res.json({
                message:"There is no products"
            })
        }
        res.status(200).json({
            success:true,
            products:allProducts,
        })

    }
    catch(err){
        res.status(500).json({
            success:false,
            message:"Internal server Error"
        })
    }
}

//create 

const createProduct = async(req,res)=>{
    try{
        const {name,price,description,category}=req.body;
        const newProduct=new Product({name, price, description, category});
        await newProduct.save();
        res.status(200).json({
            success:true,
            product:newProduct
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:"Product undefined "
        })
    }
}

//update

const updateProduct= async(req,res)=>{
    try{
        const {id}=req.params;
        const {name,price,description,category}=req.body;

        const updatedProduct = await Product.findByIdAndUpdate (id,{name,price,description,category}, {new:true});
        //new:true returns the new updated product in postman else the old values is shown
        if(!updateProduct){
            res.json({
                message:"Product not found"
            })
        }

        res.status(200).json({
            product:updatedProduct
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:"Product not updated"
        })
    }
}

//delete

const deleteProduct = async(req,res)=>{
    const {id}=req.params;
    try{
        const deletedProduct = await Product.findByIdAndDelete(id);
        if(!deleteProduct){
            res.json({
                message:"Product not found"
            })
        }
        res.status(200).json({
            message:"product deleted successfully",
            product:deletedProduct
        })
    }
    catch(err){
        res.status(500).json({
            success:false, 
            message:err.message
        })
    }
}

module.exports={getProducts,updateProduct,createProduct,deleteProduct}