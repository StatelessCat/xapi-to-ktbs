/* eslint-disable no-console */
const fs = require('fs');
const ktbs = require('./ktbs');
const evparser = require('./evparser');

const XAPI_TO_KTBS_MODEL_PATH = './resources/xapi-ktbs-model.ttl';

const model = fs.readFileSync(XAPI_TO_KTBS_MODEL_PATH, 'utf8');

const statements = evparser.statements;

ktbs.deleteX({
  path: '/base1/m1'
});
ktbs.deleteX({
  path: '/base1/t1/'
});
ktbs.deleteX({
  path: '/base1/'
});
ktbs.postBase({
  basename: 'base1/'
});
ktbs.postModel({
  path: '/base1/',
  headers: {'Content-Type': 'text/turtle'},
  payload: model
});
ktbs.postTrace({
  basepath: '/base1/',
  tracename: 't1/',
  hasModel: '/base1/m1'
});

statements.filter(function(st) {
  return st['id'] !== 'f590683e-c87e-4b0c-96d9-d5f7c312a4b2' &&
    st['id'] !== '935e030d-1af6-4415-9106-864f2d682ffa' ;
  // The first one seems to be a malformed statement
  // TODO check the second one
}).forEach(function(statement) {
  const ss1 = statement;
  var ss2 = JSON.parse(JSON.stringify(ss1)); // TODO fix quick/dirty cloning
  ss2["@id"] = ss1.id;
  ss2["@type"] = ["m:xapiStatement", ss1["@type"]];
  // ^ TODO handle the case of ss1["@type"] is an array
  ss2["hasTrace"] = "./";
  ss2["@context"] = [
    "http://liris.cnrs.fr/silex/2011/ktbs-jsonld-context",
    ss1["@context"],
    { "m": "http://localhost:8001/base1/m1#" }
  ];
  // Note the order of @context declarations
  //  ktbs context must be specified before the tincan2prov one
  ktbs.postObsel({
    path: '/base1/t1/',
    payload: JSON.stringify(ss2),
    headers: {'Content-Type': 'application/ld+json'}
  });
});

