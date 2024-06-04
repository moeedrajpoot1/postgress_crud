const {hash}=require("bcryptjs")
const userModel=require('../Models/userModels')

const {v4:uuid}=require("uuid")
const userModels = require("../Models/userModels")
module.exports={
    createUser:async(body)=>{
        try {
            
            const IsUser=await userModel.getUser(false,body.userName)
            console.log(IsUser,"check")
            if(IsUser.error||IsUser.response){
                return{
                    error:IsUser.error
                }
            }
            body.password=await hash(body.password,10)
            body.userId=uuid()
            const user= await userModel.createUser(body)
            console.log(user,"check 1")
          
            return {response:user.response}
        } catch (error) {
            return {
                error:error
            }
        }
    },
    getAllUser:async(query)=>{
        try {
            query.offset=(query.pageNo-1)*query.limit
            const user =await userModel.getAllUser(query)
            if(user.error){
              return{
                message:"no user Exists",
                 error:user.error
              }

            }
            return{
                response:user.response
            }
        } catch (error) {
            return{
                error:error
            }
        }
    },
    deleteUser:async(userId)=>{
        try {
            const deleteUser=await userModels.deleteUser(userId);
            if(deleteUser.error || !deleteUser.response){
                return{
                    message:"Unable to delete user",
                    error:deleteUser?.error|| deleteUser.response
                }
            }
            return {
                response:deleteUser.response,
                message:"User deleted successfully"
            }
        } catch (error) {
            return {error:error}
        }
    },
    

    updateUser:async(body)=>{
        try {
            const updateUser=await userModels.updateUser({...body})
            if(updateUser.error || !updateUser.response){
                return{
                    message:"Unable to Update",
                    error:updateUser?.error|| updateUser .response
                }
            }
            return {
                response:{response:updateUser.response,
                    message:"User updated"}
            }

        } catch (error) {
            return{
                error:error
            }
        }
    }


  
}