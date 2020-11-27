const express = require('express');
const router = express.Router();
// var multer = require('multer')
// var upload = multer()
//Item Model

//@route GET api Items
// @desc Get All Items 
// @ access Public
const mysql = require('mysql');
const connection = require('../../config/connection');

router.post('/', (req, res) => {
    console.log("req.body.images", req.body);
    connection.query(`INSERT INTO info(image,data,date,currency) VALUES('${''}','${req.body.datas}','${req.body.dates}','${req.body.currencys}')`, (error, result) => {
        if (error) {
            console.log("error", error);
            return res.send(error)
        }
        else {

            connection.query(`SELECT * from info`, (error, result) => {
                if (error) {
                    return res.send(error)
                }
                else {
                    return res.send(result)
                }
            })
        }
    })

})


router.get('/', (req, res) => {
    connection.query(`SELECT * from info`, (error, result) => {
        if (error) {
            return res.send(error)
        }
        else {
            return res.send(result)
        }
    })
});


router.delete('/:id', (req, res) => {
    console.log("delete id ", req.params)
    connection.query(`DELETE FROM info where id=${req.params.id}`, (error, result) => {
        if (error) {
            return res.send(error)
        }
        else {

            return res.send({ isSuccess: true, message: "Succeffuly Deleted item" })
        }
    })
})

router.put('/:id', (req, res) => {
    console.log("req.params id", req.params.id)
    console.log("req.params", req.body)
    connection.query(`UPDATE info set data='${req.body.datas}',date='${req.body.dates}',currency='${req.body.currencys}' where id =${req.params.id}`, (err, result) => {
        if (err) {
            return res.send(err)
        }
        else {
            connection.query('SELECT * FROM info', (errr, ress) => {
                if (errr) {
                    return res.send(errr)
                }
                else {
                    return res.send(ress)
                }
            })
        }

    })
})





module.exports = router;