/**
 * Created by mandeep on 9/13/17.
 */

/*
var graph = require('facebook-complete');
var conf = {
    client_id:      '118045498900273',
    client_secret:  'ffab260e64b70e769b501acf3fbf795a',
    scope:          'email, user_about_me, user_birthday, user_location, publish_stream',
    redirect_uri:   'http://localhost:3000/auth/facebook'
};
*//*
let cheerio = require('cheerio')
//let $ = cheerio.load('http://sjdowntown.com/events/')
let $ = cheerio.load('https://www.siliconvalley-codecamp.com/Session/2017')

exports.scrape = function (req, res) {
    var companiesList = [];
    console.log("inside scrape")
    $('#session_7337').each(function(index, element){
        companiesList[index] = {};
        console.log("inside $")
        var header = $(element).find('[ProfessionalSession]');
        companiesList[index]['title'] = header
        console.log(companiesList)
        res.send(companiesList);
    })
    res.end();
}*/


var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');


exports.scrape = function (req, res) {
    url = "https://www.siliconvalley-codecamp.com/Session/2017"
    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);
            var json1 = { title : ""};
            var arrEvents =[];
            //console.log($('.ProfessionalSession').eq(0).text());
            for(var i=0;i<$('.ProfessionalSession').length;i++){
            	arrEvents.push($('.ProfessionalSession').eq(i).text().replace(/(\r\n|\n|\r)/gm,""));
            	console.log($('.ProfessionalSession').eq(i).text());
            }
            
          /*
            $('#sessionsTable').filter(function () {
                var data = $(this);
                
                //console.log(data)
                title = data.children().first().text();
                //console.log(data);
                json1.title = title;
            })
            */
            
 
           res.render("scrape", {
               values : arrEvents
           });

        }
    })
}



/*

exports.scrape = function (req, res) {
    url = "http://sjdowntown.com/events/"
    request(url, function(error, response, html){

        // First we'll check to make sure no errors occurred when making the request

        if(!error){
            // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality

            var $ = cheerio.load(html);
            // Finally, we'll define the variables we're going to capture
            var json = { title : ""};
            $('.dp_pec_content').filter(function () {
                var data = $(this);
                console.log(data)
                title = data.eq(2).text();
               // console.log("data:" +data[0])
                console.log("title: "+title)
                json.title = title;
            })

            res.send(JSON.stringify(json));
        }
    })
}


*/

/*

exports.scrape = function (req, res) {
    url = "http://www.sanjose.org/events/"
    request(url, function(error, response, html){

        if(!error){
            var $ = cheerio.load(html);
            console.log("I'm here");
            var json1 = { title : ""};
            var arrSJD =[];
            console.log($('.col-sm-6 col-md-6 venueinfo').eq(0).text());
            for(var i=0;i<$('.ProfessionalSession').length;i++){
            	arrEvents.push($('.ProfessionalSession').eq(i).text().replace(/(\r\n|\n|\r)/gm,""));
            	console.log($('.ProfessionalSession').eq(i).text());
            }
            
           res.render("scrape", {
               values : arrSJD
           });

        }
    })
}

*/