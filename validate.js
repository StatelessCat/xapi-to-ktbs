/* eslint-disable no-console */
const http = require('http');
const N3 = require('n3');

var n3parser = N3.Parser();

new Promise(function(resolve, reject) {
  http.get({
    hostname: 'localhost',
    port: 8001,
    path: '/b1/t1/02abc888-2672-45bb-8256-f01efdda6660',
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
        resolve({prefixes: prefixes, triples: acc});
      }
    });
  });
}).then(function(parsed) {
  return new Promise(function(resolve, reject) {
    var writer1 = N3.Writer({ format: 'N-Triples' });
    parsed.triples.forEach(({subject, predicate, object}) => writer1.addTriple(subject, predicate, object));
    writer1.end(function (error, result) {
      if (error) {
        reject(error);
      }
      else {
        resolve(result);
      }
    });
  });
}).then(function(triples){
  // we got triples
  // we can use jsonld.js to get jsonld
});

