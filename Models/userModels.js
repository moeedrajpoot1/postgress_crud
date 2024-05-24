
const {models}=require("./index")

module.exports={
    createUser:async(body)=>{
        try {
            const user=await models.users.create({...body});
            return{
                response:user
            }
        } catch (error) {
            return{
                error:error
            }
        }
    },
    getUser:async(userId,userName)=>{
        try {
            const user= await models.users.findOne({
                ...(userId ? {where:{userId:userId}}:{where:{userName:userName}})
            });
           
            return{
                response:user
                
            }
            

        } catch (error) {
            return{
                error:error
            }
        }
    },
    getAllUser:async()=>{
        try {
            const user=await models.users.findAll({
                attributes:["userId","userName"]
            });
            return{
                response:user
            }
            
        } catch (error) {
            return {
                error:error.message
            }
        }
    },
    deleteUser:async(userId)=>{
        try {
            const deleteUser=await models.users.destroy({userId:userId})
            return {
                response:deleteUser,
            }
        } catch (error) {
            return {error:error}
        }
    },
      updateUser:async(userId,body)=>{
        try {
            const updateUser=await models.users.update({...body},{where:{userId:userId}})
            return{
                response:updateUser
            }
        } catch (error) {
            return{
                error:error
            }
        }
    }
}