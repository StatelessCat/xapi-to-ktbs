/* eslint-disable no-console */
/* globals Promise:true */
const http = require('http');
const N3 = require('n3');
const fs = require('fs');
var jsonld = require('jsonld');

var n3parser = N3.Parser();

const FRAME_PATH = './resources/framing/frame.json';
var frame_str = fs.readFileSync(FRAME_PATH, 'utf8');
var frame_ = JSON.parse(frame_str);

new Promise(function(resolve, reject) {
  http.get({
    hostname: 'localhost',
    port: 8001,
    path: '/b1/t1/be3ece5e-477b-4f02-be8e-5badb5ca9873',
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

      jsonld.frame(doc, frame_, function(err, framed) {
        fs.writeFile('statement-1-jsonld-out-framed.json', JSON.stringify(framed, null, 2), (err) => {
          if (err) throw err;
          console.log('It\'s saved!');
        });
      });

      fs.writeFile('statement-1-jsonld-out.json', JSON.stringify(doc, null, 2), (err) => {
        if (err) throw err;
        console.log('It\'s saved!');
      });
    });
  });
});


