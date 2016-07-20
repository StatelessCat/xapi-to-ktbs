var Hjson = require('hjson');
const fs = require('fs');

var computed_trace_uri = process.argv[2] || 'prov_trace42/';

if (!process.argv[2]) {
  console.log('node xapi-to-prov.js <computed trace URI>');
}

// read resources/xapi-to-prov-mapping.hjson
const XAPI_TO_PROV_MAPPING_PATH = './resources/xapi-to-prov-mapping.hjson';
const mapping_hjson = fs.readFileSync(XAPI_TO_PROV_MAPPING_PATH, 'utf8');
const mapping_array = Hjson.parse(mapping_hjson);
// console.log(Hjson.stringify(mapping_json));

const transformation = {
  "@id": computed_trace_uri,
  "@type": "ComputedTrace",
  "hasSource": [ "t1/" ],
  "hasMethod": "k:translation"
};
let parameters = mapping_array.map(({xapi, prov}) => ({[xapi]: prov}));
// format parameters to something like   "parameter": [
//    "model=http://localhost:8001/b1/nomodel",
//    "map={\"http://semweb.mmlab.be/ns/tincan2prov/actor\": \"http://www.w3.org/ns/prov#Agent\"}"
//  ]

// add it to the transformation object litteral
// send the transformation to the kTBS

