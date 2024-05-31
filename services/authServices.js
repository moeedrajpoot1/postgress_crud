require("dotenv").config()
const {compare}=require("bcryptjs")
const userModel=require("../Models/userModels")
const {sign}=require("jsonwebtoken")

module.exports={
    login:async(body)=>{
        try {
            const user= await userModel.getUser(false,body.userName)
            if(user.error || !user.response){
                return {
                    error:{
                        message:"no user Found",
                        error: user?.error || user.response
                    }
                }
            }
            const isValid= await compare(body.password,user.response.dataValues.password)
            if(!isValid){
                return {
                    response:{
                        message:"Invalid Credentials",
                        response:false,
                        token:null
                    }
                }
            }
        delete user.response.dataValues.password;
        const token= sign(user.response.dataValues,process.env.SECRET_KEY)
        console.log("token ",token)
            return {
                response:{
                    message:"Login Succesfull",
                    response:true,
                    token:token
                }
            }
        } catch (error) {
            return {
                error:error
            }
            
        }
    }
}