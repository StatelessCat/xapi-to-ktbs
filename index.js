/* eslint-disable no-console */
const fs = require('fs');
const ktbs = require('./lib/ktbs');
const evparser = require('./lib/evparser');
var jsonld = require('jsonld');

const XAPI_TO_KTBS_MODEL_PATH = './resources/xapi-ktbs-model.ttl';
// const SPARQL_TRANS_PATH = './resources/trans.rq'; // TODO use me
const SPARQL_TRANS_PATH_TEST = './resources/trans-test.ttl';
const IN_NORMALIZED_PATH = './resources/in-normalized/';

const model = fs.readFileSync(XAPI_TO_KTBS_MODEL_PATH, 'utf8');
// const rq = fs.readFileSync(SPARQL_TRANS_PATH, 'utf8'); // TODO use me
const trans_test = fs.readFileSync(SPARQL_TRANS_PATH_TEST, 'utf8');

const statements = evparser.statements;
const fus_statement = evparser.fusionned;

ktbs.deleteX({
  path: '/b1/joinRelated1/'
});
ktbs.deleteX({
  path: '/b1/m1'
});
ktbs.deleteX({
  path: '/b1/t1/'
});
ktbs.deleteX({
  path: '/b1/'
});
ktbs.postBase({
  basename: 'b1/'
});
ktbs.postModel({
  path: '/b1/',
  headers: {'Content-Type': 'text/turtle'},
  payload: model
});
ktbs.postTrace({
  basepath: '/b1/',
  tracename: 't1/',
  hasModel: '/b1/m1'
});

fus_statement.id = 'abc1234'; // Avoid id collisions
statements.push(fus_statement); // Add the "fusionned" statement
statements.filter(function(st) {
  return st['id'] !== 'f590683e-c87e-4b0c-96d9-d5f7c312a4b2' &&
    st['id'] !== '935e030d-1af6-4415-9106-864f2d682ffa' ;
  // The first one seems to be a malformed statement
  // TODO check the second one
}).forEach(function(statement) {
  const ss1 = statement;

  jsonld.normalize(ss1, {
    algorithm: 'URDNA2015',
    format: 'application/nquads'
  }, function(err, normalized) {
    const in_normalized_filename = IN_NORMALIZED_PATH + 'eval-' + ss1.id + '-in-normalized.n3';
    fs.writeFile(in_normalized_filename, normalized, (err) => {
      if (err) throw err;
    });
    // normalized is a string that is a canonical representation of the document
    // that can be used for hashing, comparison, etc.
  });

  var ss2 = JSON.parse(JSON.stringify(ss1)); // TODO fix quick/dirty cloning
  ss2["@id"] = ss1.id;
  ss2["@type"] = ["m:xapiStatement", ss1["@type"]];
  // ^ TODO handle the case of ss1["@type"] is an array
  ss2["hasTrace"] = "./";
  ss2["beginDT"] = ss2.timestamp;
  ss2["endDT"] = ss2.timestamp;
  ss2["@context"] = [
    "http://liris.cnrs.fr/silex/2011/ktbs-jsonld-context",
    ss1["@context"],
    { "m": "http://localhost:8001/b1/m1#" }
  ];
  // Note the order of @context declarations
  //  ktbs context must be specified before the tincan2prov one
  ktbs.postObsel({
    path: '/b1/t1/',
    payload: JSON.stringify(ss2),
    headers: {'Content-Type': 'application/ld+json'}
  });
});

ktbs.postComputedTrace({
  payload: trans_test
});

