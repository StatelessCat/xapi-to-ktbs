const fs = require('fs');
const ktbs = require('./ktbs');
const jsonld = require('jsonld');

const EVAL_1_JSONLD_PATH =
      './resources/tincan2prov/evaluation-1-jsonld.jsonld';
const XAPI_TO_KTBS_MODEL_PATH = './resources/xapi-ktbs-model.ttl';

const s1 = fs.readFileSync(EVAL_1_JSONLD_PATH, 'utf8');
const model = fs.readFileSync(XAPI_TO_KTBS_MODEL_PATH, 'utf8');

jsonld.normalize(JSON.parse(s1), {
  algorithm: 'URDNA2015',
  format: 'application/nquads',
}, function(err, normalized) {
  console.log('==============');
  console.log(normalized);
  console.log('==============');
});

ktbs.deleteX({
  path: '/base1/m1',
});
ktbs.deleteX({
  path: '/base1/t1/',
});
ktbs.deleteX({
  path: '/base1/',
});
ktbs.postBase({
  basename: 'base1/',
});
ktbs.postModel({
  path: '/base1/',
  headers: {'Content-Type': 'text/turtle'},
  payload: model,
});
ktbs.postTrace({
  basepath: '/base1/',
  tracename: 't1/',
  hasModel: '/base1/m1',
});
ktbs.postObsel({
  path: '/base1/t1/',
  payload: s1,
  headers: {'Content-Type': 'application/ld+json'},
});

