const express = require('express');
const router = express.Router();


router.get('/',(request,response)=>{
    response.redirect('/index.html');
});

module.exports = router;