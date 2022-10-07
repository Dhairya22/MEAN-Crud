// const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require("jsonwebtoken");
var cors = require("cors");
const SECRET_KEY = "mynameisdhairyaandimanangulardeveloper";
const userSchema = require('./model/users');

const app = express();
app.use(express.json());
app.use(cors());

// Register API
app.post('/register', async (req, resp) => {    
    try {
        const existingUser = await userSchema.findOne({ name: req.body.name });
        if (existingUser == null) {
            const user = req.body.name;
            const password = req.body.password;
            // const hashedPassword = await bcrypt.hash(req.body.password, 10);
            let data = new userSchema({ name: user, password: password });
            let result = await data.save();
            resp.status(200).send(result);
        } else {
            resp.status(403).send("User Already Exist !!");
        }
    } catch (err) {
        resp.status(500).send({message: err});
    }
});

// Login API
app.post('/login', async (req, resp) => {
    try{
        const existingUser = await userSchema.findOne({ name: req.body.name, password: req.body.password });
        if(existingUser != null){
            const token = await jwt.sign({ name: req.body.name }, SECRET_KEY);
            resp.status(200).send({name: req.body.name, token: token});
        } else {
            resp.status(401).send({message: "Invalid Username or Password !!"});
        }
    }catch (err) {
        resp.status(500).send({message: err});
    }
});

app.listen(5500, () => {
    console.log("Auth Server is live 5500");
});