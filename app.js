var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var helmet = require('helmet');

var app = express();



app.locals.la  = require('./liveagent-sdk-nodejs/liblist');
app.locals.clients = [];
app.use(helmet())
/*
app.locals.txtHandler = (msg) => {

  postMessage(msg);
 
}

app.locals.opt = {
      
  "endpointUrl": "https://d.la3-c2-fra.salesforceliveagent.com/chat/rest/",
  "version": 48,
  "organizationId": "00D1p000000yUqU",
  "deploymentId": "5721p000000GtDj",
  "buttonId": "'5731p000000GvQv",
  "botid": "appi"
}

*/

/*
app.locals.clientInfo = {
    name: "example client",
    language: "en_US",
    screenResolution: "none",
    visitorName: "wsProxy",
}
*/



//app.locals.respo = {now : "here", numby :1};
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));



module.exports = app;
