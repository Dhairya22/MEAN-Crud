const express = require('express');
require('./config');
const videoSchema = require('./model/videos');
var cors = require("cors");

const PORT = 5000;

const app = express();
app.use(express.json());
app.use(cors());

app.post('/create', async (req, resp) => {
    let data = new videoSchema(req.body);
    let result = await data.save();
    resp.send(result);
});

app.get('/list', async (req,resp) => {
    let data = await videoSchema.find();
    resp.send(data);
});

app.put('/update/:_id', async (req, resp) => {
    console.log(req.body);
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

app.listen(PORT);