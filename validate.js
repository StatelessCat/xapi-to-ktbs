/* eslint-disable no-console */
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
        console.log(acc);
        resolve({prefixes: prefixes, triples: acc});
      }
    });
  });
}).then(function(parsed) {
  return new Promise(function(resolve, reject) {
    var writer1 = N3.Writer({ format: 'N-Quads' });
    parsed.triples.forEach(({subject, predicate, object}) => writer1.addTriple(subject, predicate, object, 'http://example.org/'));
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
  var x = trs.split('\n').slice(1,3).join('\n');
  console.log(x);
  // deserialize N-Quads (RDF) to JSON-LD
  jsonld.fromRDF(x, {format: 'application/nquads'}, function(err, doc) {
    // 
    // <> <http://liris.cnrs.fr/silex/2009/ktbs#hasBegin> "1426032000000"^^<http://www.w3.org/2001/XMLSchema#integer> <http://example.org/mycartoon>.
    // produces : message: 'Error while parsing N-Quads; invalid quad.'
    console.log(err);
    console.log(doc);
  });
});

