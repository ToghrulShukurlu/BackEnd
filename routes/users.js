const router = require("express").Router();
const User = require('../models/user')
const jwt = require('jsonwebtoken')


router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (!user) return res.status(404).json({ message: "Username or password is wrong" })

        const checkPassword = user.password === req.body.password
        if (!checkPassword) return res.status(404).json({ message: "Username or password is wrong" })

        const token = jwt.sign({_id : user._id},"12343")

        res.status(200).json(token)

    }
    catch {
        res.status(404).json({ message: "Username or password is wrong" })

    }
})

router.post('/register', async (req, res) => {
    try {
        const newUser = await newUser({
            name: req.body.name,
            surname: req.body.surname,
            username: req.body.username,
            password: req.body.password,
            wallet: req.body.wallet,
            cvv: req.body.cvv,
        })

        const saveUser = await newUser.save()
        res.status(200).json({ mes: "User added Succesfully" })
    }

    catch {
        res.status(400).json({ mes: "!!! USER NOT ADDED !!!" })

    }
})





module.exports = router;