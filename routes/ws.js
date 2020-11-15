var express = require('express');
var router = express.Router();


var responseObject = {
    "actions": [
    ]
};

router.ws('/echo', function(ws, req) {
  console.log('socket', ws);
  const botname = 'kidsbot';
  function txtHandler (msg, tres)  {
   ws.send(msg);
    responseObject = {
        "reply": msg
    };
    
        
    //app.locals.reso.json({return : msg})
      
    //console.log("send msg: " + msg + ", result: " + result);
  }

  langs='nl-NL';
    
    
  var botid = 'kidsbot'
  var botconfig = {
      
    "endpointUrl": process.env.endpointUrl,
    "version": 50,
    "organizationId": process.env.organizationId,
    "deploymentId": process.env.deploymentId,
    "buttonId": process.env.buttonId,
    "botid": "botsdance"
}
var clientInfo = {
  name: "CanBotsDance",
  language: "en_US",
  screenResolution: "none",
  visitorName: "canbotsdance",
  prechatDetails : [
    {"label":"proxyChannel__c","value": 'botdance',"displayToAgent":true,"transcriptFields": ["proxyChannel__c"]},
    {"label":"proxyLanguage__c","value": langs,"transcriptFields":[ "proxyLanguage__c" ],"displayToAgent":true},
    
    ]
}

req.app.locals.clients['voicebot'] = new req.app.locals.la.Client(botconfig, clientInfo);
//req.app.locals.clients[req.body.sid].res = res;
//req.app.locals.clients[req.body.sid].startmessage = req.body.CurrentInput;
req.app.locals.clients['voicebot'].start(txtHandler);

  ws.on('message', function(msg) {
    console.log('message!', msg);
    if(msg == "ping"){
      ws.send("pong");
      return;
    }
    console.log('wsMes', msg)
    req.app.locals.clients['voicebot'].send(msg);
  });
});



module.exports = router;
