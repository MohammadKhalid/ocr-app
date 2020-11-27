const express = require('express');
const router = express.Router();


router.get('/getImage', (req, res) => {


    console.log("req", params.path);
    res.download('../../images/' + req.params.path)
})

module.exports = router;