var express = require('express');
var app = express();
var fs = require("fs");

var bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.post('/sendEmail', function (req, res) {
	try {
		console.log(req.body + req.body.senderName + req.body.senderEmail + req.body.msg);
		var senderName = req.body.senderName;
		var senderEmail = req.body.senderEmail;
		var message = req.body.msg;

		const sgMail = require('@sendgrid/mail');
		sgMail.setApiKey(process.env.SendGrid_API_Key);
		console.log(process.env.SendGrid_API_Key);
		const msg = {
		  to: 'gauravjain.sfdev@gmail.com',
		  from: senderEmail,
		  subject: senderName + ' has sent a message',
		  text: message,
		  html: '<p>'+message+'</p>',
		};
		sgMail.send(msg).then(function(result) {
	        res.end( 'SUCCESS' );
	    }, function(err) {
	        res.end( 'FAILURE' );
	    });
	}
	catch(ex)
	{
		res.end( 'FAILURE' );
	}
})
app.listen(process.env.PORT || 3000);

