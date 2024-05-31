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
            if(login.error){
                return res.send({
                    error:login.error
                })
            }
            res.cookie("auth",login.response.token)
            delete login.response.token
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