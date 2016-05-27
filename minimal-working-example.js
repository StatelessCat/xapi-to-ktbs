/* eslint-disable no-console */
const jsonld = require('jsonld');

const nquads_docs = [

  '<> <http://liris.cnrs.fr/silex/2009/ktbs#hasBegin> <http://ex.co/xxx> .',

  '_:b0 <http://liris.cnrs.fr/silex/2009/ktbs#hasBegin> <http://ex.co/xxx> .',
  
  '<> <http://liris.cnrs.fr/silex/2009/ktbs#hasBegin> <http://ex.co/xxx>  <http://ex.co/xxx> .',

  '_:b0 <http://liris.cnrs.fr/silex/2009/ktbs#hasBegin> <http://ex.co/xxx>  <http://ex.co/xxx> .',
  
  '<> <http://liris.cnrs.fr/silex/2009/ktbs#hasBegin> "14260"^^<http://www.w3.org/2001/XMLSchema#integer> .',

  '_:b0 <http://liris.cnrs.fr/silex/2009/ktbs#hasBegin> "14260"^^<http://www.w3.org/2001/XMLSchema#integer>.'
];
nquads_docs.forEach(function(nquads_doc) {
  jsonld.fromRDF(nquads_doc, {format: 'application/nquads'}, function(err, doc) {
    console.log("------------------------------------------------------------");
    console.log(nquads_doc);
    console.log("============================================================");
    console.log(err);
    console.log(JSON.stringify(doc, null, 2));
    console.log("------------------------------------------------------------");
  });
});
