const {Model,DataTypes}=require("sequelize")
const sequelize=require("../../bin/dbconnection")
const {v4:uuid}=require("uuid")
const users=require("./userModels")
class sessions extends Model {}

sessions.init({
sessionId:{
    primaryKey:true,
    type:DataTypes.STRING()
},
token:{
    allowNull:false,
    unique:true,
    type:DataTypes.STRING()
},

    userId:{
        type:DataTypes.STRING(),
        allowNull:false,
        unique:true,
        references:{
            model:users,
            key:"userId"
        }
    }

},{tableName:"sessions",sequelize})

sessions.beforeCreate((session)=>{
    session.sessionId=uuid()
})

module.exports=sessions