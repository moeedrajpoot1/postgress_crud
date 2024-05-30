const taskModels=require('../Models/taskModels')
const {v4:uuid}=require("uuid")


  module.exports={
    createTask:async(body)=>{
        try {
            body.taskId=uuid()
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
    },
    getAlltask:async()=>{
        try {
            const task =await taskModels.getAlltask()
            
            if(task.error){
                return {
                    error:"No task exist"
                }
            }
            return{
                response:task.response
            }
        } catch (error) {
            return {
                error:error
            }
        }
    }
   
}