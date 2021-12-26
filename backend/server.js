const app = require('./app')

const PORT = process.env.PORT || 5000;
require('dotenv').config();

//connect database
const connectDatabase = require("./config/database")
connectDatabase();





app.listen(PORT, () => {
    console.log(`server running at port ${PORT}`)
})