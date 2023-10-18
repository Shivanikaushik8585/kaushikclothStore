
const User =require('../models/User')
const bcrypt = require('bcrypt')
const jwt  = require("jsonwebtoken");
const { error ,sucess } = require('../utils/responsWrappper');
const signupController =async(req,res)=>{
try{
  const {email,password,name}= req.body;
  if(!email ||!password || !name ){
    // res.status(400).send("all filed are required");
    res.send(error(400,"all field are required"))
  }
  const oldUser = await User.findOne({email});
  if(oldUser){
    // return res.status(409).send("user is already register");
    return res.send(error(409,"user is already reqister"));
  }
  const hashedPassword = await bcrypt.hash(password,10);
  const user = await User.create({
    name,
    email,
    password:hashedPassword,

  })
  
  // return res.status(201).json({
  //   user,
  // })
  return res.send(sucess(201,'user created Suceesfully'))

}catch(e){
  return res.send(error(500,e.message));
}
}
const loginController = async(req,res)=>{
    try{
      const {email,password}= req.body;
      if(!email ||!password  ){
        res.send(error(400,'All field required'));
        // res.status(400).send("all filed are required");
      }
      const user = await User.findOne({email}).select('+password');
      if(!user){
        return res.send(error(409,"user not found"))
        // return res.status(409).send("user not found");
      
       return res.send(error,)}
      const matched = await bcrypt.compare(password,user.password);
      if(!matched){
        return res.send(error(403,"Incorrect password"));
        // return res.status(403).send("Incorrect password");
      }
      const accessToken =generateAcessToken({_id: user._id});
      const refToken =generateRefToken({_id: user._id});
      res.cookie('jwt',refToken,{
        httpOnly:true,
        secure:true,
      })
      return res.send(sucess(200,{accessToken}));


      
    }catch(error){

    }

}
const refacessTokenController = async(req,res)=>{
  // const {refToken}= req.body;
  const cookies= req.cookies
  if(!cookies.jwt){
 return res.send(error(401,'Reference token is required '))
    // return res.status(401).send("Refress token is required");
    
  }
  const refToken = cookies.jwt;
 
  try {
    const decoded = jwt.verify(
        refToken,
        process.env.ACCESS_TOKEN_Ref_KEY
    );
    const _id = decoded._id;
    const accessToken = generateAcessToken({_id});
    return res.send(sucess(201,{accessToken}));
    
   

    next();
} catch (e) {
    
    // return res.status(401).send("Invalid access key");
    return res.send(error(401, 'Invalid access key'))
}

}
// internal function
const generateAcessToken =(data) =>{
  try{
 const token= jwt.sign(data,process.env.ACCESS_TOKEN_PRIVATE_KEY,{
  expiresIn: "1d",
 });
 console.log(token)
 return token;
}catch(e){
  console.log(e);

}
}
// ACCESS_TOKEN_Ref_KEY
//  for referencetoken
const generateRefToken =(data) =>{
  try{
 const token= jwt.sign(data,process.env.ACCESS_TOKEN_Ref_KEY,{
  expiresIn: "1y",
  
 });
 console.log(token)
 return token;
}catch(e){
  console.log(e);

}
}
const logoutController = async(req,res)=>{
try{
res.clearCookies('jwt',{
  httpOnly:true,
  secure:true,})
  return res.send(sucess(200,"user loogout"))
}catch(e){
  return res.send(error(500,e.message));
}
}
module.exports= {
    signupController,
    loginController,
    refacessTokenController,
    logoutController
    
}