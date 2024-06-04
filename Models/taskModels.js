const {models}=require("./index")


module.exports={
    createTask:async(body)=>{
        try {
            const task=await models.tasks.create({...body})
        return{
            response:task
        }
        } catch (error) {
            return{
                error:error
            }
        }
    },
    getAlltask:async()=>{
        try {
            const task=await models.tasks.findAll({
                attributes:{
                    exclude:["deletedAt"]
                },
                include:{
                    model:models.users,
                    attributes:["userId",'userName']
                }
            })
            return{
                response:task
            }
        } catch (error) {
            return{
                error:error
            }
        }
    }
}