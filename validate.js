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
    path: '/b1/t1/@obsels',
    method: 'GET',
    headers: {
      'Accept': 'application/turtle'
    }
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
}).then(function(val){
  return new Promise(function(resolve, reject) {
    var acc = [];
    n3parser.parse(val, function (error, triple, prefixes) {
      if (triple) {
        acc.push({
          subject:   triple.subject,
          predicate: triple.predicate,
          object:    triple.object
        });
      }
      else {
        //console.log(acc);
        resolve({prefixes: prefixes, triples: acc});
      }
    });
  });
}).then(function(parsed) {
  return new Promise(function(resolve, reject) {
    var writer1 = N3.Writer({ format: 'N-Quads' });
    parsed.triples.forEach(({subject, predicate, object}) => writer1.addTriple(subject, predicate, object, 'http://example.org/'));
    // ajout d'un nom de graphe qui sert juste a rendre possible la sérialisation en JSON-LD par la suite
    
    writer1.end(function (error, result) {
      if (error) {
        reject(error);
      }
      else {
        resolve(result);
      }
    });
  });
}).then(function(trs){
  jsonld.fromRDF(trs, {format: 'application/nquads'}, function(err, doc) {
    console.log(err);
    console.log(JSON.stringify(doc, null, 2));
  });
});

