const router = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

// Register
router.post('/register', async (req, res) => {
    try{
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })
        const user = await newUser.save()
        res.status(200).json(user)
    }catch(err){
        res.status(500).json(err)
    }
})

router.post('/login', async (req, res) => {
    try{
        const user = await User.findOne({username: req.body.username})
        // If no user
        if(!user){
            return res.status(400).json('No User Found!');
        }
        // If user exists 
        const validate = await bcrypt.compare(req.body.password, user.password);
        // If password is wrong
        if(!validate){
            res.status(400).json('Wrong Credentials!')
        }
        const {password, ...others} = user._doc
        res.status(200).json(others)
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router;