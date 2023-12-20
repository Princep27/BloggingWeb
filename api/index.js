const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
const postRoute = require("./routes/post");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: ["http://localhost:3000"]
  }));  
app.use(cookieParser());

mongoose
    .connect(`${process.env.MONGO_URL}`)
    .then(console.log("Connected to MongoDB"))
    .catch((err)=>console.log(err)
);


app.use("/api/users/",userRoute);
app.use("/api/posts/",postRoute);
 

app.listen(process.env.PORT || 5000, ()=>{
    console.log("Backend is Running");
})