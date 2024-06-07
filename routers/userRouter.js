const express=require("express")
const router=express.Router()
const {createUser,getAllUser,deleteUser,updateUser}=require("../controllers/userController")
const {middleware,admin}=require("../middleware")

router.post("/create",admin,createUser)
router.get("/get",middleware,getAllUser)
router.delete("/delete",deleteUser)
router.put("/update",updateUser)



module.exports=router;