const express = require('express');
const multer = require('multer');
require('./config');
const auth = require('./auth');
const videoSchema = require('./model/videos');
var cors = require("cors");
require('dotenv').config();

const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());

app.use('/',auth);

app.post('/create', async (req, resp) => {
    let data = new videoSchema(req.body);
    let result = await data.save();
    resp.send(result);
});

app.get('/list', async (req,resp) => {
    let data = await videoSchema.find();
    resp.send(data);
});

app.get('/list/:_id', async (req,resp) => {
    let data = await videoSchema.findById(req.params._id);
    resp.send(data);
});

app.put('/update/:_id', async (req, resp) => {
    let data = await videoSchema.updateOne(
        { _id: req.params._id },
        { $set: req.body }
    );
    resp.send(data);
});

app.delete('/delete/:_id', async (req, resp) => {
    let data = await videoSchema.deleteOne(
        { _id: req.params }
    );
    resp.send(data);
});

app.delete('/delete', async (req, resp) => {
    console.log(req.body);
    // let data = await videoSchema.deleteMany({
    //     _id: {
    //         $in: req.body
    //     }
    // });
    // resp.send(data);
});

app.get('/search/:key', async (req, resp) => {
    let data = await videoSchema.find({
        "$or": [
            { "name": { $regex: req.params.key }},
            { "channel_name": { $regex: req.params.key }},
            { "type": { $regex: req.params.key }}
        ]
    });
    resp.send(data);
});

const upload = multer({
    storage: multer.diskStorage({
        destination: function(req, file, cb){
            cb(null,"uploads")
        },
        filename: function(req, file, cb){
            cb(null, file.fieldname + "-" + Date.now() + ".jpg")
        }
    })
}).single("logo");

app.post("/upload", upload, (req, resp) => {
    resp.send("file uploaded")
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}` );
});