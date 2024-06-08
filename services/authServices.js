require("dotenv").config()
const {compare}=require("bcryptjs")
const userModel=require("../Models/userModels")
const {sign}=require("jsonwebtoken")
const sessionModel=require("../Models/sessionModels")
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
                        session:"null"
                    }
                }
            }
        delete user.response.dataValues.password;
        const token= sign(user.response.dataValues,process.env.SECRET_KEY)
        const {userId}=user.response.dataValues
        const isSession=await sessionModel.getSession(userId,false)

       if(isSession.error || isSession.response){
         if(isSession.error){
            return{
                response:{
                    message:"invalid credentials",
                    response:false,
                    session:'null'
                }
            }
         }


       const deleteSession=await  sessionModel.deletesession(userId)

       if(deleteSession.error || !deleteSession.response){
        return {
            response:{
                message:"Invalid credentials",
                response:false,
                session:"null"
            }
        }
       }
       }






       const session = await sessionModel.createSession({userId,token})
       if(session.error){
        return {
            response:{
                message:"Invalid credentials",
                response:false,
                session:"null"
            }
        }

       }
       



            return {
                response:{
                    message:"Login Succesfull",
                    response:true,
                    session:session.response
                }
            }
        } catch (error) {
            return {
                error:error
            }
            
        }
    }
}