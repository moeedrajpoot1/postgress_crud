const sequelize=require('../bin/dbconnection')
const users=require("../Models/definations/userModels")
const models={users}


const Db={}
Db.sequelize=sequelize
sequelize.models=models


module.exports={Db,models}