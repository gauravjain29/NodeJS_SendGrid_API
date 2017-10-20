var express = require('express');
var app = express();
var fs = require("fs");

app.get('/listUsers', function (req, res) {

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SendGrid_API_Key);
console.log('here');
console.log(process.env.SendGrid_API_Key);
const msg = {
  to: 'gauravjain.sfdev@gmail.com',
  from: 'test@example.com',
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
sgMail.send(msg);
       res.end( 'SUCCESS' );
})
app.listen(process.env.PORT || 3000);

