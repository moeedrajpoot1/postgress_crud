const express=require("express")
const router=express.Router()
const {createUser,getAllUser,deleteUser}=require("../controllers/userController")

router.post("/create",createUser)
router.get("/get",getAllUser)
router.delete("/delete",deleteUser)




module.exports=router;