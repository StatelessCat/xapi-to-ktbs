const fs = require('fs');
const ktbs = require('./ktbs');

fs.readFile('./resources/evaluation-1-jsonld.jsonld', (err, data) => {
  if (err) { throw err; }
  const statement1 = JSON.parse(data);
  // console.log(statement1);
  // console.log('statement1 readed.');
});

const model =
      '@prefix : <http://liris.cnrs.fr/silex/2009/ktbs#> .' + '\n' +
      '@prefix xsd:  <http://www.w3.org/2001/XMLSchema#> .' + '\n' +
      '<.> :contains <m1> .' + '\n' +
      '<m1> a :TraceModel .' + '\n' +
      '<#xapiStatement> a :ObselType .' + '\n' +
      '<http://semweb.mmlab.be/ns/tincan2prov/version> a :AttributeType ;' + '\n' +
      '    :hasAttributeDomain <#xapiStatement> ;' + '\n' +
      '    :hasAttributeRange xsd:string .' + '\n';

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
});

