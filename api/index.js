const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const postRoute = require("./routes/post");
const cors = require("cors");

dotenv.config();
app.use(express.json());
app.use(cors());
app.get("/",(req,res) => {
  res.setHeader("Access-Control-Allow-Credentials","true")
  res.send("API is running");
});

mongoose
    .connect(`${process.env.MONGO_URL}`)
    .then(console.log("Connected to MongoDB"))
    .catch((err)=>console.log(err)
);


app.use("/api/auth/",authRoute);
app.use("/api/users/",userRoute);
app.use("/api/posts/",postRoute);
 

app.listen(process.env.PORT || 5000, ()=>{
    console.log("Backend is Running");
})
