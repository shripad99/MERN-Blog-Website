const router = require('express').Router()
const User = require('../models/user')
const Post = require('../models/post')
const bcrypt = require('bcrypt')
const e = require('express')

router.put("/:id", async (req, res) => {
    if(req.body.userId === req.params.id){
        if(req.body.password){
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }
        try{
            const updateUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            },{new: true})
            res.status(200).json(updateUser)
        }catch(err){
            res.status(500).json(err)
        }
    }else{
        res.status(401).json("You can update only your account")
    }
})

// delete
router.delete("/:id", async (req, res) => {
    if(req.body.userId === req.params.id){
        try{
            const user = await User.findById(req.params.id)
            if(user){
                try{
                    await Post.deleteMany({username: user.username})

                    // only delete user accounts
                    await User.findByIdAndDelete(req.params.id)
                    res.status(200).json("User has been deleted")
                }catch(err){
                    res.status(500).json(err)
                }
            }
        }catch(err){
            res.status(404).json("User not found")
        }
    } else{
        res.status(401).json("You can delete only your account")
    }
})

// get user
router.get("/:id", async (req, res) => {
    try{
        const user = await User.findById(req.params.id)
        const {password, ...other} = user._doc
        res.status(200).json(other)
    }catch(err){
        res.status(400).json(other)
    }
})

module.exports = router;