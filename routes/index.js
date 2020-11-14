var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var OWNER_AUTH = require('../constants/auth');
const Task = require('../models/tasks');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/about', function(req, res, next) {
  res.render('About', { title: 'Express' });
});
router.get('/contact', function (req, res, next) {
    res.render('Contact', { title: 'Express' });
});

router.get('/projects', function (req, res, next) {
  res.render('Projects', { title: 'Express' });
});

router.get('/services', function (req, res, next) {
  Task.find((err, result) => {
    if (err) {
      console.log(err);
    }
    else {
      res.render('Services', { result:result });
    }
  }
  )
    
});

router.post('/contactDetails', function(req, res, next) {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: OWNER_AUTH
  });
  const obj = JSON.parse(JSON.stringify(req.body));
   const email = obj.email;
   console.log(obj);
  var mailOptions = {
    from: OWNER_AUTH.user,
    to: email,
    subject: 'Sending Email on behalf of Owner',
    text: 'We recieved your message and will set up meeting as soon as possible.'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      res.render('success',{ name: obj.firstname } )
      console.log('Email sent: ' + info.response);
    }
  });
  
   
  console.log('form submit');
});

module.exports = router;
