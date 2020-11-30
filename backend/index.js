const express = require('express');
const multer = require('multer');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
var add_data = require('./api/CRUD/index.js');
var Tesseract = require('tesseract.js');
const path = require("path");
//middlewares
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

const PORT = process.env.PORT | 5000;
app.use(bodyParser.json());

var Storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, __dirname + '/images');
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
});

var upload = multer({
    storage: Storage
}).single('image');
//route
app.get('/', (req, res) => {
    res.render('index');
});

app.post('/upload', (req, res) => {
    console.log(req.file);
    upload(req, res, err => {
        if (err) {
            console.log("err", err);
            return res.send('Something went wrong');
        }

        var image = fs.readFileSync(

            __dirname + '/images/' + req.file.originalname,
            {
                encoding: null
            }
        );




        Tesseract.recognize(image)
            .progress(function (p) {
            })
            .then(function (result) {
                let text = result.text;

                const newText = text.split(/\s/).join(' ');
                var currency = '';
                currency = newText.match(/((Rs.)|(\$)|(\£)) ?[+-]?[0-9]{1,3}(?:,?[0-9])*(?:\.[0-9]{1,2})?/g);
                if (currency != undefined && currency != null && currency.length > 0) {
                    currency = currency.toString()
                }
                var date = '';
                date = newText.match(/([0-9]+-[0-9]+-[0-9]+[0-9]+[0-9]+[0-9])/g)
                if (date != undefined && date != null && date.length > 0) {
                    date = date.toString()
                }
                var newTextT = text.replace(/'/g, "^")
                var obj = {
                    image: req.file.originalname,
                    data: newTextT,
                    dates: date,
                    currencys: currency
                }

                res.send(obj);


            });
    });
});
app.get("/showdata/:id", (req, res) => {
    res.set({ 'Content-Type': 'image/png' });
    res.sendFile(path.join(__dirname, "./images/" + req.params.id));
});
app.use('/api/add/', add_data);
app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`);
});