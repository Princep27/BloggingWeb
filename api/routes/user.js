const router =  require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("../middleware/auth");


//Register
router.post("/register", async (req,res)=>{
    try{
        const salt =  await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password,salt);

        const newUser = new  User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass
        });

        const user = await newUser.save();
        res.status(200).json(user);
    }catch(err){
        res.status(400).json(err);
    }
})

//Login
router.post("/login",async (req,res)=>{
    try{
        const user  = await User.findOne({username: req.body.username});
        if(!user){
            res.status(400).json("Wrong Credentials")
        }else{
            const validate = await bcrypt.compare(req.body.password,user.password);
            if(validate){
                const {username,email,_id} = user._doc;

                const token = jwt.sign({_id},process.env.JWT_KEY);
                res.cookie("token",token,{
                    maxAge: 24 * 60 * 60 * 1000, //1 day valid
                    httpOnly: true,
                    secure: true
                });
                res.status(200).json({"user" : {username,email,_id},"success":true,"message":`Welcome back ${username}`});
            }else{
                res.status(400).json({"succes":true,"message":"Wrong Credentials"})
            }
        }
    }catch(err){
        res.status(500).json(err);
    }
})


//logout
router.post("/logout",isAuthenticated,async (req,res)=>{
    try{
        res.cookie("token",null,{
            expires: new Date(Date.now())
        });
        res.status(200).json({success:true, message: "loggout successfull"});
    }catch(err){
        res.status(500).json(err);
    }
})


//delete User
router.delete("/",isAuthenticated,async (req,res)=>{
    if(req.body.userId  == req.user._id){
        try{
            const user = await User.findById(req.user._id);
            try{
                await Post.deleteMany({username: user.username});
                await User.findByIdAndDelete(req.user._id);
                res.status(200).json("User has been deleted");
            }catch(err){
                res.status(500).json(err);
            }
        }catch(err){
            console.log(err);
            res.status(500).json("user not found");
        }
    }else{
        res.status(400).json("you can delete your account");
    }
})

//getuser
router.get("/getme",isAuthenticated,async (req,res)=>{
    try{
        const user = await User.findById(req.user._id);
        const {username,email,_id} = user._doc;
        res.status(200).json({"user":{username,email,_id},success: true});    
    }catch(err){
        res.status(500).json(err);
    }
})


//update
router.put("/",isAuthenticated, async (req,res)=>{
    
    if(req.body._id == req.user._id){
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password,salt);
        }
        try{
            const oldUserDetail = await User.findById(req.user._id);
            // Updating user name 
            const updatedUser = await User.findByIdAndUpdate(req.user._id,{
                $set: req.body,
            },
            {new : true}
            );

            //updating user name in all posts(author)
            const resUpdateUsernamePost = await Post.updateMany({username:oldUserDetail.username},{$set:{username:req.body.username}}); 
            //console.log(resUpdateUsernamePost);

            const {email,username} = updatedUser;
            res.status(200).json({"user":{email,username},"message" : "Succesfull Updated","success":true});
        }catch(err){
            res.status(500).json(err);
        }
    }
})

module.exports = router;