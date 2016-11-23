var express = require('express');
var path = require('path');
var nodemailer = require('nodemailer');
var helmet = require('helmet');
var app = express();

app.use(express.static(path.join(__dirname, '/client')));
app.use(helmet());

var server = require('http').createServer(app);  
var bodyParser = require('body-parser');
var transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
    	user: '',
    	pass: ''
	}
});

app.use(bodyParser.json());



app.post('/sendMail', function(req, res){
	console.log('sendmail');
	console.log(req.body);
	if (req.body.person && req.body.email){
		var mailOptions = {
		    from: req.body.email, 
		    to: '', 
		    subject: 'IMPORTANT! FROM PORTFOLIO SITE!! FROM ' + req.body.person, 
		    text: '🐴 PORTFOLIO MESSAGE: 🐴 ' + req.body.message,
		    html: '<b>' + 'Person: ' + req.body.person + ' 🐴 + Email: ' + req.body.email + '🐴 + message: ' + req.body.message + '</b>'
		};
	
		transporter.sendMail(mailOptions, function(error, info){
			if (error){
				res.json({'status': false});
			}else{
				res.json({'status': true});
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

