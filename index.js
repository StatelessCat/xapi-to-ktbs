/* eslint-disable no-console */
const fs = require('fs');
const ktbs = require('./ktbs');

const EVAL_1_JSONLD_PATH =
      './resources/jsonld-obsel.jsonld';
const s1 = fs.readFileSync(EVAL_1_JSONLD_PATH, 'utf8');
const XAPI_TO_KTBS_MODEL_PATH = './resources/xapi-ktbs-model.ttl';

const model = fs.readFileSync(XAPI_TO_KTBS_MODEL_PATH, 'utf8');

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
console.log('====');
console.log(s1);
console.log('====');
ktbs.postObsel({
  path: '/base1/t1/',
  payload: s1,
  headers: {'Content-Type': 'application/ld+json'}
});

