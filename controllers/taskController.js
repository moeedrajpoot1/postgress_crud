const taskService=require("../services/taskservices")
const joi =require("joi")


const createTaskSchema=joi.object().keys({
    taskName:joi.string().min(3).max(20).required(),
    description:joi.string(),
    userId:joi.string().max(255).required()

})

module.exports={
    createTask:async(req,res)=> {
      try {
        const taskValidat=await createTaskSchema.validateAsync(req.body);
        const task = await taskService.createTask(taskValidat)
        if(task.error){
          return res.send({
            error:task.error
          })
        }
        return res.send({
            response:task
        })
      } catch (error) {
        return res.send({message:error.message})
      }
        
        }
}


