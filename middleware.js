require("dotenv").config()
const {verify}=require("jsonwebtoken")
const sessionModel=require("./Models/sessionModels")
module.exports={
    middleware:async(req,res,next)=>{
        try {
           
        let {token,userId,sessionId}=req.cookies.auth
        if(token==="null"){
            return res.send({
                response:"unauthorized Token"
            })  }



        const isSession= await sessionModel.getSession(userId,token)
         if(isSession.error || !isSession.response){
            return res.send({
                response:"Unauthorized User"
            })
         }




         token=isSession.response.dataValues.token
         verify(token,process.env.SECRET_KEY,(error,data)=>{
          if(error){
            return res.send({
                response:"Forbidden Access"
            })
          }


          req.userData=data
          next()
        })
        
        
          
         
        } catch (error) {
            return res.send({
                error:error
            })
        }
    },
    admin:async(req,res,next)=>{
        try {
           
        const token=req.cookies.auth
        if(token==="null"){
            return res.send({
                response:"unauthorized Token"
            })  }
         verify(token,process.env.SECRET_KEY,(error,data)=>{
          if(error){
            return res.send({
                response:"Forbidden Access"
            })
          }
         if(data.role != "admin"){
            return res.send({
                response:"You ARe not Admin"
            })
         }
          req.userData=data
          next()
        })
        
        
          
         
        } catch (error) {
            return res.send({
                error:error
            })
        }
    }
}