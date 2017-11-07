var json_responses;
//var Client = require('node-rest-client').Client;
var http = require('http'),
  assert = require('assert');

var mongo = require("./mongoConnect");
var mongoURL = "mongodb://ec2-54-183-239-166.us-west-1.compute.amazonaws.com:27017/cmpe295";
//var json_re={user:"kalyani"};
var output = [];
var outputFun = [];

/*
//Extract data for Meetup data
mongo.connect(mongoURL, function(db) {
  console.log('Connected to mongo at: ' + mongoURL);
  var collection = db.collection('meetupapi');
  collection.find().toArray(function(err, result) {
    if (result.length) {
      output = output.concat(result[0].muEvents);
      //output.push(result[0].muEvents);
      //console.log(output[0][0].id);
    } else {
      console.log(err)
    }
  })
  db.close();
});
*/

//Extract data for Eventbrite data- SJ and SF
mongo.connect(mongoURL, function(db) {
  console.log('Connected to mongo at: ' + mongoURL);
  var coll1 = db.collection('eventbriteapi');
  coll1.find().toArray(function(err, result) {
    if (result.length) {

      output= output.concat(result[0].ebEventsSJ);
      output= output.concat(result[1].ebEventsSF);
      console.log("Eventbrite!!!!!!")
      console.log(output);
    } else {
      console.log(err)
    }
  })
  db.close();
});

//Extract data for Fun Events data
mongo.connect(mongoURL, function(db) {

  console.log('Connected to mongo at: ' + mongoURL);
  var coll2 = db.collection('sjscrape');
  coll2.find().toArray(function(err, result) {
    if (result.length) {
      //console.log(result[0].allEvents);
      outputFun=outputFun.concat(result[0].allEvents);
      //console.log("Fun Events")
      //console.log(outputFun);
    } else {
      console.log(err)
    }
  })
  db.close();
});

//Tech Events page - techEvents.ejs
exports.listTechEvents = function(req, res) {
  res.render("techEvents", {
    values: output
  });
};
//Fun Events page - FunEvents.ejs
exports.listFunEvents = function(req, res) {
  res.render("funEvents", {
    fun:  outputFun
  });
};

//Single Tech Event page - techEventDetails.ejs
exports.listTechEventDetails = function(req, res) {
  var eventid = req.param("id");
  var eventType = req.param("type");
  var eventCategory = req.param("cat");
  console.log("id= " + eventid,"type="+eventType, "cat"+eventCategory);
  if(eventCategory == 'tech'){
    for( var i=0;i<output.length; i++){
      if(output[i].id == eventid && output[i].type == eventType){
        res.render("techEventDetails",{
          values:output[i]
        })
      }
    }
  }
};

//Single Fun Event page - funEventDetails.ejs
exports.listFunEventDetails = function(req, res) {
  var eventid = req.param("id");
  var eventType = req.param("type");
  console.log("id= " + eventid,"type="+eventType);
  if (eventType == 'fun'){
    for( var i=0;i<outputFun.length; i++){
      if(outputFun[i].id == eventid){
        res.render("funEventDetails",{
          values:outputFun[i]
        })
      }
    }
  }
};
