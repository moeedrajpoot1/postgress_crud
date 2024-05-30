const taskModels=require('../Models/taskModels')
const {v4:uuid}=require("uuid")


  module.exports={
    createTask:async(body)=>{
        try {
            body.uuid=uuid()
            const task= await taskModels.createTask(body)
            if(task.error){
                return{
                    error:task.error
                }
            }
            return {
                response:task.response
            }
        } catch (error) {

            return {
                error:error
            }
        }
    }
}