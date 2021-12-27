const app = require('./app')
const mongoose = require("mongoose")
const PORT = process.env.PORT || 5000;
require('dotenv').config();

//connect database
console.log(process.env.MONGO_URL)
mongoose.connect("mongodb://localhost:27017/dogsDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("connected to MongoDB"))
    .catch((err) => console.log(err))





app.listen(PORT, () => {
    console.log(`server running at port ${PORT}`)
})