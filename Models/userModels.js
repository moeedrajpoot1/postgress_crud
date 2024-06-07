
const {models}=require("./index")
const {Op}=require("sequelize")
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
                ...(userId ? {where:{userId:userId}}:{where:{userName:userName}}),
           
           
           attributes:{
             exclude:["deletedAt","createdAt","updatedAt"]
           }
           
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
    getAllUser:async(query,userId,role)=>{
        try {
            console.log("model2222222222222222222222222222222222",query,userId,role)
            const user=await models.users.findAll({
                where:{
                ...(role == "admin" ? true : { userId:userId }),
                ...(query.userName 
                    ? {userName:{[Op.substring]:query.userName}}:true
                ),
                ...(query.createdAt 
                    ? {createdAt:{[Op.substring]:query.createdAt}}:true
                )
                },
                attributes:["userId","userName","createdAt"],
                include:{
                    model:models.tasks
                   },
            offset:query.offset,
            limit:query.limit,
            order:[
                [
                query.sortBy? query.sortBy :"createdAt",
                query.orderBy?query.orderBy:"ASC",
                ]
            ]
            });
            console.log("querryyyyyy    userrrrrrrrrrr",user)
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
      updateUser:async({userId,...body})=>{
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