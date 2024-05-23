const express=require("express")
const router=express.Router()
const {createUser,getAllUser}=require("../controllers/userController")

router.post("/create",createUser)
router.get("/get",getAllUser)





module.exports=router;