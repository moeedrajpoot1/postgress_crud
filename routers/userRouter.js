const express=require("express")
const router=express.Router()
const {createUser,getAllUser,deleteUser,updateUser}=require("../controllers/userController")

router.post("/create",createUser)
router.get("/get",getAllUser)
router.delete("/delete",deleteUser)
router.put("/update",updateUser)



module.exports=router;