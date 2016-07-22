/* eslint-disable no-console */
/*globals Promise:true*/
const fs = require('fs');
const ktbs = require('./lib/ktbs');
const evparser = require('./lib/evparser');
var jsonld = require('jsonld');

const XAPI_TO_KTBS_MODEL_PATH = './resources/xapi-ktbs-model.ttl';
// const SPARQL_TRANS_PATH = './resources/trans.rq'; // TODO use me
const SPARQL_TRANS_PATH_TEST = './resources/trans-test.ttl';
const IN_NORMALIZED_PATH = './resources/in-normalized/';

const model = fs.readFileSync(XAPI_TO_KTBS_MODEL_PATH, 'utf8');
const trans_test = fs.readFileSync(SPARQL_TRANS_PATH_TEST, 'utf8');

const statements = evparser.statements;

Promise
  .all([
    ktbs.deleteX({path: '/b1/joinRelated1/'}),
    ktbs.deleteX({path: '/b1/m1'}),
    ktbs.deleteX({path: '/b1/t1/'})
  ])
  .then(([res1, res2, res3]) => {
    console.log("les deletes sont finis", res1, res2, res3);
    return ktbs.deleteX({path: '/b1/'});
  })
  .then((res1) => {
    console.log("le delete de la base est fini", res1);
    return ktbs.postBase({basename: 'b1/'});
  })
  .then(() => {
    return ktbs.postModel({
      path: '/b1/',
      headers: {'Content-Type': 'text/turtle'},
      payload: model
    });
  })
  .then(() => {
    return ktbs.postTrace({
      basepath: '/b1/',
      tracename: 't1/',
      hasModel: '/b1/m1'
    });
  })
  .then(() => {
    
    var promise_array = statements.filter(function(st) {
      return st['id'] !== 'f590683e-c87e-4b0c-96d9-d5f7c312a4b2' &&
        st['id'] !== '935e030d-1af6-4415-9106-864f2d682ffa' ;
      // first one seems to be a malformed statement, TODO check the second
    }).map(function(statement) {
      
      jsonld.normalize(statement, {
        algorithm: 'URDNA2015',
        format: 'application/nquads'
      }, function(err, normalized) {
        const in_normalized_filename = IN_NORMALIZED_PATH + 'eval-' + statement.id + '-in-normalized.n3';
        fs.writeFile(in_normalized_filename, normalized, (err) => {
          if (err) throw err;
        });
      });
      
      return ktbs.to_obsels({
        "statement": statement,
        "id": statement.id
      });
    });
    return Promise.all(promise_array);
  })
  .then((obsel_array) => {
    return Promise.all(obsel_array.map((st)=> {
      return ktbs.postObsel({
        path: '/b1/t1/',
        payload: JSON.stringify(st),
        headers: {'Content-Type': 'application/ld+json'}
      });      
    }));
  })
  .then(() => {
    ktbs.postComputedTrace({
      payload: trans_test
    });
  })
  .catch(err => {
    console.log(err);
  });

