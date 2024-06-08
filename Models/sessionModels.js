const { where } = require("sequelize")
const {models}=require("./index")
const { response } = require("express")

module.exports={
    createSession:async({...body})=>{
        try {
            console.log("body",body)
            const session= await models.sessions.create({...body})
            return{
                response:session
            }
        } catch (error) {
            return {
                error:error
            }
        }
    },

getSession:async(userId,token)=>{
try {
    const getsession= await models.sessions.findOne({
...(token
    ? {where :{userId:userId, token:token}}
    :{where:{userId:userId}}
)
    })
    return{
        response:getsession
    }
} catch (error) {
    return{
        error:error
    }
}
},
    deletesession:async(userId)=>{
        try {
            const session=await models.sessions.destroy({where:{userId:userId}})
            return{
                response:session
            }
        } catch (error) {
            return {
                error:error
            }
        }
    }
}