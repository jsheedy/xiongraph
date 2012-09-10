var graph = require('./xion_graph.js').graph;
var http = require('http');

var JSONDataSource = function() {
  this.base_url = ""
  this.attr = ""
  this.url = function() {};
}

function TwitterDataSource(username) {
  JSONDataSource.apply(this,arguments);
  this.username = username;
  this.base_url = "http://api.twitter.com/1/statuses/user_timeline.json?screen_name="; //xion3e09a";
  this.attr = "text";
  this.url = function() {
    return this.base_url + this.username;
  }
}
function XionDataSource() {
  JSONDataSource.apply(this,arguments);
  this.base_url = "http://arise.velotronheavyindustries.com/communications/json/";
  this.attr = "body";
  this.url = function() {
    return this.base_url;
  }
}

var usernames = ["BarackObama", "singularityhub", "DoctorOctagonMD" ];
//var usernames = ["BarackObama", "singularityhub", "DoctorOctagonMD", "xion3e09a"];
var sources = [new XionDataSource() ];
//var sources = [ ];
for(var i=0; i<usernames.length; i++) {
  sources.push(new TwitterDataSource(usernames[i]));
}

for(var j=0; j < sources.length; j++ )
{
  (function() {
    var url = sources[j].url();
    var attr = sources[j].attr;
    console.log(url);

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
        var spk = graph.Speak(null, 6);
        console.log(" " + spk);
      });
    });
  })();
}
