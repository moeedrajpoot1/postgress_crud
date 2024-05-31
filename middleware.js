require("dotenv").config()
const {verify}=require("jsonwebtoken")
module.exports={
    middleware:async(req,res,next)=>{
        try {
           console.log(req.cookies)
        const token=req.cookies.auth
        if(token==="null"){
            return res.send({
                response:"unauthorized Token"
            })  }
        await verify(token,process.env.SECRET_KEY,(error,data)=>{
          if(error){
            return res.send({
                response:"Forbidden Access"
            })
          }
        })

        req.userData=data
           next()
         
        } catch (error) {
            return res.send({
                error:error
            })
        }
    }
}