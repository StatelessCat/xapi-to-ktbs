/* eslint-disable no-console */
const fs = require('fs');
const jsonld = require('jsonld');
const N3 = require('n3');

const EVAL_1_JSONLD_PATH =
      './resources/tincan2prov/evaluation-1-jsonld.jsonld.simple';
const s1 = fs.readFileSync(EVAL_1_JSONLD_PATH, 'utf8');

jsonld.normalize(JSON.parse(s1), {
  algorithm: 'URDNA2015',
  format: 'application/nquads'
}, function(err, normalized) {
  console.log('==Normalised==');
  console.log(normalized);
  console.log('==============');
  var parser = N3.Parser();
  var writer = N3.Writer();
  parser.parse(normalized, function (error, triple) {
    if (triple) {
      writer.addTriple({
        subject:   triple.subject,
        predicate: triple.predicate,
        object:    triple.object
      });
    }
    else {
      console.log('====Turtle====');
      writer.end(function (error, result) { console.log(result); });
      console.log('==============');
    }
  });  
});

