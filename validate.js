/* eslint-disable no-console */
/* globals Promise:true */
const http = require('http');
const N3 = require('n3');
const fs = require('fs');
var jsonld = require('jsonld');
const deterministic_stringify = require('json-stable-stringify');

var n3parser = N3.Parser();

const FRAME_PATH = './resources/framing/frame.json';
var frame_str = fs.readFileSync(FRAME_PATH, 'utf8');
var frame_ = JSON.parse(frame_str);

const XAPI_CONTEXT_PATH = './resources/tincan2prov/tincan2prov.jsonld';
var xapi_context_str = fs.readFileSync(XAPI_CONTEXT_PATH, 'utf8');
var xapi_context = JSON.parse(xapi_context_str);

const OUT_PATH = './resources/out/';
const OUT_FRAMED_PATH = './resources/out-framed/';

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
      // const out_filename = OUT_PATH + 'eval-' + doc.id + '-out.json';
      // fs.writeFile(out_filename, JSON.stringify(doc, null, 2), (err) => {
      //   if (err) throw err;
      //   console.log('It\'s saved!');
      // });
      jsonld.frame(doc, frame_, function(err, framed) {
        const out_framed_filename = OUT_FRAMED_PATH + 'eval-' + framed['@graph'][0]['id'] + '-out-framed.json';
        fs.writeFile(out_framed_filename, deterministic_stringify(framed, {space: 2}), (err) => {
          if (err) throw err;
          console.log('It\'s saved!');
        });
      });
    });
  });
});


