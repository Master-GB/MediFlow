import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken =(res,id,name,role)=>{
  const token = jwt.sign({id,name,role}, process.env.JWT_SECRET, {expiresIn:'7d'});

  res.cookie('token', token, {
        httpOnly:true,
        secure:process.env.NODE_ENV === 'production',
        sameSite:process.env.NODE_ENV === 'production'? 'none' :'strict',
        maxAge:7*24*60*60*1000
    });
}

export const registerUser = async (req,res) =>{
  const {name,email,password,role} = req.body;

  if(!name || !email || !password || !role){
    return res.status(400).json({ success:false , message:"Missing Details"});
  }

  try {  
    const existingUser = await userModel.findOne({email});
    if(existingUser){
        return res.status(400).json({ success:false , message:"User already exists"});
    };
    const hashedPassword = await bcrypt.hash(password,10);
    const newUser = new userModel({
        name,
        email,
        password:hashedPassword,
        role
    });

    await newUser.save();
    generateToken(res,newUser._id,newUser.name,newUser.role);

    res.status(201).json({ success:true , message:"User registered successfully"});

  } catch (error) {
    res.status(500).json({ success:false , message:"Registeration failed", error:error.message});
  }

}


export const loginUser = async (req,res) =>{
  const {email,password} = req.body;

  if(!email || !password){
    return res.status(400).json({ success:false , message:"Missing Details"});
  }

  try {   
    const user = await userModel.findOne({email});
    if(!user){
        return res.status(400).json({ success:false , message:"Invalid email"});
    }

    const isPasswordValid = await bcrypt.compare(password,user.password);
    if(!isPasswordValid){
        return res.status(400).json({ success:false , message:"Invalid password"});
    }

    generateToken(res,user._id,user.name,user.role);

    return res.status(200).json({ success:true , message:"Login successful"});

  } catch (error) {
    return res.status(500).json({ success:false , message:"Login failed", error:error.message});
  }
}

export const logoutUser = async(req,res)=>{
  try {
    res.clearCookie('token',{
        httpOnly:true,
        secure:process.env.NODE_ENV === 'production', 
        sameSite:process.env.NODE_ENV === 'production'? 'none' :'strict'
      })

    return res.status(200).json({ success:true , message:"Logout successful"});
  } catch (error) {
    return res.status(500).json({ success:false , message:"Logout failed", error:error.message});
  }
}



