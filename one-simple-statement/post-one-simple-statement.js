/*globals Promise:true*/
const fs = require("fs");
const ktbs = require("../lib/ktbs");

const STATEMENT_PATH = './simple-statement.json';
const statement_string = fs.readFileSync(STATEMENT_PATH, 'utf8');
const statement_json = JSON.parse(statement_string);

const XAPI_TO_KTBS_MODEL_PATH = '../resources/xapi-ktbs-model.ttl';
const model = fs.readFileSync(XAPI_TO_KTBS_MODEL_PATH, 'utf8');

Promise.all([
  ktbs.deleteX({path: '/b1/joinRelated1/'}),
  ktbs.deleteX({path: '/b1/m1'}),
  ktbs.deleteX({path: '/b1/t1/'}),
]).then(() => {
  return ktbs.deleteX({path: '/b1/'});
}).then(() => {
  return ktbs.postBase({basename: 'b1/'});
}).then(() => {
  return ktbs.postModel({
    path: '/b1/',
    headers: {'Content-Type': 'text/turtle'},
    payload: model
  });
}).then(() => {
  return ktbs.postTrace({
    basepath: '/b1/',
    tracename: 't1/',
    hasModel: '/b1/m1'
  });
}).then(() => {
  return ktbs.to_obsels({
    "statement": statement_json,
    "id": statement_json.id
  });
}).then((obsel) => {
  return ktbs.postObsel({
    path: '/b1/t1/',
    payload: JSON.stringify(obsel),
    headers: {'Content-Type': 'application/ld+json'}
  });      
}).then((msg) => {
  console.err(msg);
}).catch(err => {
  console.err(err);
});


