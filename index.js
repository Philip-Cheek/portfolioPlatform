var express = require('express');
var path = require('path');
var nodemailer = require('nodemailer');
var app = express();

app.use(express.static(path.join(__dirname, '/client')));

var server = require('http').createServer(app);  
var bodyParser = require('body-parser');
var transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
    	user: 'REDACTED',
    	pass: 'REDACTED'
	}
});

app.use(bodyParser.json());



app.post('/sendMail', function(req, res){
	console.log('sendmail');
	console.log(req.body);
	if (req.body.person && req.body.email){
		var mailOptions = {
		    from: req.body.email, 
		    to: 'REDACTED', 
		    subject: 'IMPORTANT! FROM PORTFOLIO SITE!! FROM ' + req.body.person, 
		    text: 'Hello world 🐴',
		    html: '<b>' + req.body.person + '</b>'
		};
	
		transporter.sendMail(mailOptions, function(error, info){
			if (error){
				console.log(error)
			}else{
				console.log('success!')
			}
		});
	}
});

app.get('*', function(req, res){
   res.sendFile(__dirname + '/client/index.html');
});
	

var server = app.listen(5000, function(){
  console.log('we\'re listening on port 5000');
});

