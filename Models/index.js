const sequelize=require('../bin/dbconnection')
const users=require("../Models/definations/userModels")
const tasks=require("../Models/definations/tasks")
const models={users,tasks}





//  relations
users.hasMany(tasks,{foreignKey:"userId"})
tasks.belongsTo(users,{foreignKey:"userId"})
const Db={}



Db.sequelize=sequelize
sequelize.models=models


module.exports={Db,models}