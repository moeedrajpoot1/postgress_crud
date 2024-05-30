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
    }
}