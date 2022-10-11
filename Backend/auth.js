// const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require("jsonwebtoken");
const SECRET_KEY = "mynameisdhairyaandimanangulardeveloper";
const userSchema = require('./model/users');
const router = express.Router();

// Register API
router.post('/register', async (req, resp) => {    
    try {
        const existingUser = await userSchema.findOne({ name: req.body.name });
        if (existingUser == null) {
            const user = req.body.name;
            const password = req.body.password;
            // const hashedPassword = await bcrypt.hash(req.body.password, 10);
            let data = new userSchema({ name: user, password: password });
            let result = await data.save();
            resp.status(200).send({message: 'Record Saved Successfully !!',result});
        } else {
            resp.status(200).send({message: "Username already taken !!"});
        }
    } catch (err) {
        resp.status(500).send({message: err});
    }
});

// Login API
router.post('/login', async (req, resp) => {
    try{
        const existingUser = await userSchema.findOne({ name: req.body.name, password: req.body.password });
        if(existingUser != null){
            const token = await jwt.sign({ name: req.body.name }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: "15 minutes"
            });

            // Check if user is valid or not.
            const userVer = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            
            resp.status(200).send({name: req.body.name, token: token, expiresIn: userVer.exp});
        } else {
            resp.status(401).send({message: "Invalid Username or Password !!"});
        }
    }catch (err) {
        resp.status(500).send({message: err});
    }
});

module.exports = router;