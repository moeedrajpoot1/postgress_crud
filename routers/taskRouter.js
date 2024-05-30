const express=require("express")
const router=express.Router()
const {createTask,getAlltask}=require("../controllers/taskController")


router.post("/create",createTask)
router.get("/getall",getAlltask)






module.exports=router