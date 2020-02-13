const express = require('express');
const Router = express.Router();


Router.get('/',(request,response)=>{
    response.redirect('/index.html');
});

module.exports = Router;