// SET THESE TO CONFIGURE XION

//var url = "http://arise.velotronheavyindustries.com/communications/json/";
//var attr = "body";

var username = "xion3e09a";
var username = "anatomecha";
var username = "velotron";
var username = "IBMWatson";
var username = "BarackObama";
var username = "singularityhub";
var username = "DoctorOctagonMD";
var usernames = ["DoctorOctagonMD", "singularityhub", "velotron", "xion3e09a"];
var base_url = "http://api.twitter.com/1/statuses/user_timeline.json?screen_name="; //xion3e09a";
//var url = "http://api.twitter.com/1/statuses/user_timeline.json?screen_name=" + username; //xion3e09a";
var attr = "text";

var graph = require('./xion_graph.js').graph;
var http = require('http');

for(var j=0; j < usernames.length; j++ )
{
  var url = base_url + usernames[j];
  http.get(url, function(res) {
    var s = "";
    res.on('data', function(buf) {
      s += buf.toString();
    });
    res.on('end', function(buf) {
      json = JSON.parse(s);
      for(var i=0; i < json.length; i++ ){
        var body = json[i][attr];
        graph.AddProse(body);
      }
      //console.log(j);
      //if(j == (usernames.length-1)) {
        var spk = graph.Speak(null, 6);
        console.log(" " + spk);
      //}
    });
  });
}
