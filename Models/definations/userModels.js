const {DataTypes, Model}=require("sequelize")

const sequelize=require("../../bin/dbconnection")


class users extends Model {}

users.init({
    userId:{
        primaryKey:true,
        
        type:DataTypes.STRING(),
        
    },
    userName:{
      
        allowNull:false,
        type:DataTypes.STRING()
    },
    role:{
        allowNull:false,
        defaultValue:"customer",
        type:DataTypes.ENUM,
        values:["customer","admin"]
    },
    password:{
        allowNull:false,
        type:DataTypes.STRING()
    },
  
},{timestamps:true,paranoid:true,tableName:"users",sequelize,})


module.exports = users
