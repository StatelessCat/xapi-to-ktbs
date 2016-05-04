/* eslint-disable no-console */
const fs = require('fs');
const jsonld = require('jsonld');

const EVAL_1_JSONLD_PATH =
      //      './resources/tincan2prov/evaluation-1-jsonld.jsonld';
      './resources/jsonld-obsel.jsonld';
const s1 = fs.readFileSync(EVAL_1_JSONLD_PATH, 'utf8');

jsonld.flatten(JSON.parse(s1), function(err, flattened) {
  console.log('==flattened==');
  console.log(JSON.stringify(flattened, null, 2));
  console.log('=============');
});

