const router = require("express").Router();
const Post = require("../models/Post");

//CREAT POST
router.post("/",async (req,res) => {
    const newPost = new Post(req.body);
    try{
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    }catch(err){
        res.status(200).json(err);
    }
});

//UPDATE POST
router.put("/:id",async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.username === req.body.username){
            try{
                const updatedPost = await Post.findByIdAndUpdate(
                    req.params.id,
                    {
                        $set: req.body
                    },
                    {new: true}
                );
                res.status(200).json(updatedPost);
            }catch(err){
                res.status(500).json(err);
            }
        }else{
            res.status(401).json("you can update only your post");
        }
    }catch(err){
        res.status(500).json(err);
    }
});

//DELETE POST
router.delete("/:id",async (req,res) =>{
    try{
        const post = await  Post.findById(req.params.id);
        if(post.username === req.body.username){
            try{
                await post.deleteOne();
                res.status(200).json("post deleted"); 
            }catch(err){
                console.log(err);
                res.status(500).json(err);
            };
        }else{
            res.status(400).json("you can delete only your post");
        }
    }catch(err){
        res.status(500).json(err);
    }   
});


//GET POST
router.get("/:id",async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post){
            res.status(200).json(post);
        }else{
            res.status(400).json("post not found");
        }
    }catch(err){
        res.status(500).json(err);
    }
});

//get all posts
router.get("/",async (req,res)=>{
    const userName = req.query.user;
    
    try{
        let posts;
        if(userName){
            posts = await Post.find({username:userName});
        }else{
            posts = await Post.find();
        }
        res.status(200).json(posts);
    }catch(err){ 
        res.status(500).json(err);
    }
});

module.exports = router;