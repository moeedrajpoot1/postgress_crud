const joi=require("joi");
const userservice=require('../services/userServices');

const Schemauser=joi.object().keys({
    userName:joi.string().min(3).max(20).required(),
    password:joi.string().min(3).max(20).required(),
    
   
    
})
const deleteUserSchema=joi.object().keys({
    userId:joi.string().required()
})

const updateUserSchema=joi.object().keys({
    userId:joi.string().required(),
    userName:joi.string(),
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
    deleteUser:async(req,res)=>{
        try {
            const validate= await deleteUserSchema.validateAsync(req.query);
            const deleteUser=await userservice.deleteUser(validate.userId);
            if(deleteUser.error){
                return res.send({
                    message:"user deleted",
                    error:deleteUser.error
                })
            }
            return {
                response:deleteUser.response,
            }
        } catch (error) {
            return res.send({
                message:error.message

            })
        }
    },


updateUser:async(req,res)=>{
    try {
        const validate=await updateUserSchema.validateAsync(req.body)
        const updateUser= await userservice.updateUser(validate)
        if(updateUser.error){
            return res.send({
                error:updateUser.error
            })
        }
        return res.send({
            response:updateUser.response
        })

    } catch (error) {
        return res.send({
            message:error.message
        })
    }
}
   
}