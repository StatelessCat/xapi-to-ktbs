/* eslint-disable no-console */
/* globals Promise:true */
const http = require('http');
const N3 = require('n3');
var jsonld = require('jsonld');

var n3parser = N3.Parser();

new Promise(function(resolve, reject) {
  http.get({
    hostname: 'localhost',
    port: 8001,
    path: '/b1/t1/02abc888-2672-45bb-8256-f01efdda6660',
    method: 'GET',
    headers: {
      'Accept': 'text/plain'
    }
    // TODO app/ntriples ? 
  }, (res) => {
    res.setEncoding('utf8');
    var acc = "";
    res.on('data', (chunk) => {
      acc += chunk;
    });
    res.on('end', () => {
      resolve(acc);
    });
    res.resume();
  }).on('error', (e) => {
    reject(e);
  });  
}).then(function(ntriples){
  return new Promise(function(resolve, reject) {
    jsonld.fromRDF(ntriples, {format: 'application/nquads'}, function(err, doc) {
      console.log(err);
      // console.log(JSON.stringify(doc, null, 2));
      jsonld.compact(doc, {}, function(err, compacted) {
        console.log("------------");
        console.log(JSON.stringify(compacted, null, 2));
        console.log("------------");
      });
    });
  });
});


