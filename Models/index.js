const sequelize=require('../bin/dbconnection')
const users=require("../Models/definations/userModels")
const tasks=require("../Models/definations/tasks")
const sessions=require("../Models/definations/sessions")
const models={users,tasks,sessions}





//  relations
users.hasMany(tasks,{foreignKey:"userId"})
tasks.belongsTo(users,{foreignKey:"userId"})


users.hasOne(sessions,{foreignKey:"userId"})
sessions.belongsTo(users,{foreignKey:"userId"})
const Db={}



Db.sequelize=sequelize
sequelize.models=models


module.exports={Db,models}