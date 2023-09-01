const router =  require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

//update
router.put("/:id", async (req,res)=>{
    
    if(req.body.userId == req.params.id){
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password,salt);
        }
        
        try{

            const oldUserDetail = await User.findById(req.params.id);
            // Updating user name 
            const updatedUser = await User.findByIdAndUpdate(req.params.id,{
                $set: req.body,
            },
            {new : true}
            );

            //updating user name in all posts(author)
            const resUpdateUsernamePost = await Post.updateMany({username:oldUserDetail.username},{$set:{username:req.body.username}}); 
            //console.log(resUpdateUsernamePost);

            res.status(200).json(updatedUser);
        }catch(err){
            res.status(500).json(err);
        }
    }
})

//delete User
router.delete("/:id",async (req,res)=>{
    if(req.body.userId  === req.params.id){
        try{
            const user = await User.findById(req.params.id);
            try{
                await Post.deleteMany({username: user.username});
                await User.findByIdAndDelete(req.params.id);
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

//get user
router.get("/:id",async (req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        const {password,...others} = user._doc;
        res.status(200).json(others);    
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;