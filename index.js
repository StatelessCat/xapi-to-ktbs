/* eslint-disable no-console */
const fs = require('fs');
const ktbs = require('./ktbs');
const jsonld = require('jsonld');

const EVAL_1_JSONLD_PATH =
      './resources/tincan2prov/evaluation-1-jsonld.jsonld';
      //      './resources/jsonld-obsel.jsonld';
const s1 = fs.readFileSync(EVAL_1_JSONLD_PATH, 'utf8');
const XAPI_TO_KTBS_MODEL_PATH = './resources/xapi-ktbs-model.ttl';

const model = fs.readFileSync(XAPI_TO_KTBS_MODEL_PATH, 'utf8');

var ss1 = JSON.parse(s1);

var ss2 = {
  "@id": ss1.id,
  "@type": ["m:xapiStatement", ss1["@type"]],
  "hasTrace": "./",
  "@context": [
    ss1["@context"],
    { "m": "http://localhost:8001/base1/m1#" },
    "http://liris.cnrs.fr/silex/2011/ktbs-jsonld-context"
  ]
};
console.log('==ss2=raw==');
console.log(JSON.stringify(ss2, null, 2));
console.log('===========');


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
ktbs.postObsel({
  path: '/base1/t1/',
  payload: JSON.stringify(ss2),
  headers: {'Content-Type': 'application/ld+json'}
});

jsonld.flatten(ss2, function(err, flattened) {
  console.log('==flattened==');
  console.log(JSON.stringify(flattened, null, 2));
  console.log('=============');
});

