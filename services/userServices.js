const {hash}=require("bcryptjs")
const userModel=require('../Models/userModels')

const {v4:uuid}=require("uuid")
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
    getAllUser:async()=>{
        try {
            const user =await userModel.getAllUser()
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
  
}