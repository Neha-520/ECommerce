const app = require('./app')
const mongoose = require("mongoose")
const dotenv = require("dotenv");
const PORT = process.env.PORT || 5000;

dotenv.config({ path: "backend/config/config.env" });

//Handling uncaught exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`)
    console.log(`Shutting down the server due to Uncaught Exception`)
    process.exit(1);
})
//connect database

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("connected to MongoDB"))


const server = app.listen(PORT, () => {
    console.log(`server running at port ${PORT}`)
})

//Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error : ${err.message}`)
    console.log(`Shutting down the server due to Unhandled Promise Rejection`)
    server.close(() => {
        process.exit(1);
    });
})
