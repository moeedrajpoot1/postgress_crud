const joi=require("joi");
const userservice=require('../services/userServices');

const Schemauser=joi.object().keys({
    userName:joi.string().min(3).max(20).required(),
    password:joi.string().min(3).max(20).required(),
    
   
    
})

module.exports={
    createUser:async(req,res)=>{
        try {
            const validate=await Schemauser.validateAsync(req.body)
            console.log(validate,"validate")
            const user= await userservice.createUser(validate)
            console.log(user,"User")
            if(user.error){
                return {
                    error: user.error
                }
            }
            return res.send({
                message:"user Saved",
                respone:user
            })
        } catch (error) {
            return res.status(400).send({
                message:error.message
            })
        }
    },
    getAllUser:async(req,res)=>{
      try {
        const user=await userservice.getAllUser()
        if(user.error){
           return res.send({error:user.error})
        }
        return res.send({
            response:user.response

        })
      } catch (error) {
        return res.status(400).send({
            message:error.message
        })
        
      }
    },
   
}