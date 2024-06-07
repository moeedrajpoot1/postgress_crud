const joi=require("joi");
const userservice=require('../services/userServices');

const Schemauser=joi.object().keys({
    userName:joi.string().min(3).max(20).required(),
    role:joi.string().valid("customer","admin").required(),
    password:joi.string().min(3).max(20).required(),
    
   
    
})
const deleteUserSchema=joi.object().keys({
    userId:joi.string().required()
})

const updateUserSchema=joi.object().keys({
    userId:joi.string().required(),
    userName:joi.string(),
})

const getAllUserSchema=joi.object().keys({
    pageNo:joi.number().min(1).required(),
    limit:joi.number().valid(5,10),
    userName:joi.string(),
    sortBy:joi.string().valid("createdAt","userName","deletedAt","updatedAt","userId"),
    orderBy:joi.string().valid("ASC","DESC")
})

module.exports={
    createUser:async(req,res)=>{
        try {
            const validate=await Schemauser.validateAsync(req.body)
        
            const user= await userservice.createUser(validate)
            
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
        const userId=req.userData.userId;
        const role=req.userData.role;
        const validate= await getAllUserSchema.validateAsync(req.query)
        
        const user=await userservice.getAllUser(validate,userId,role)
     
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