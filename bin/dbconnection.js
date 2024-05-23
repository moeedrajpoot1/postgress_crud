require("dotenv").config()
const {Sequelize}=require("sequelize")
const colors=require("colors")

const sequelize= new Sequelize({
    database:process.env.DB_NAME,
    username:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    host:process.env.DB_HOST,
    dialect:process.env.DB_DIALECT,
    port:process.env.DB_PORT
})
sequelize.authenticate().then(()=>{
    console.log("Database Connection Successfull".bgGreen)
}).catch((error)=>{error,"Db Connection Failed".bgRed})



module.exports=sequelize;