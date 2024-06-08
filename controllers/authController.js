const joi=require("joi")
const authServices=require("../services/authServices")

const loginSchema=joi.object().keys({
    userName:joi.string().required(),
    
    password:joi.string().min(3).max(18).required()

})

module.exports={
    login:async(req,res)=>{
        try {
            const validate= await loginSchema.validateAsync(req.body)
            const login = await authServices.login(validate)
            
            if(login.error || login.response.session=="null"){
                res.cookie("auth","null")
                return res.send({
                    error:login?.error || login.response
                })
            }
           
            const {sessionId,userId,token}=login.response.session
            res.cookie("auth",{sessionId,token,userId})
            delete login.response.session.dataValues.token
            return res.send({
                response:login.response
            })
        } catch (error) {
            return res.send({
                error:error
            })
        }
    }
}