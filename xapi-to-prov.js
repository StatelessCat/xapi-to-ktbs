/* eslint-disable no-console */
var Hjson = require('hjson');
const fs = require('fs');

var computed_trace_uri = process.argv[2] || 'prov_trace42/';
var computed_trace_model_uri = process.argv[3] || 'http://localhost:8001/b1/nomodel';

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

// format parameters to something like   "parameter": [
//    "model=http://localhost:8001/b1/nomodel",
//    "map={\"http://semweb.mmlab.be/ns/tincan2prov/actor\": \"http://www.w3.org/ns/prov#Agent\",\"http://semweb.mmlab.be/ns/tincan2prov/object\": \"http://www.w3.org/ns/prov#Entity\"}"
//  ]
var x = mapping_array.map(({xapi, prov}) => "\""+xapi+"\": \""+prov+"\"");
let map = "map={" + x.join(",") + "}";
let model = "model=" + computed_trace_model_uri;
let parameter = [model, map];
console.log(parameter);

// add it to the transformation object litteral
transformation.parameter = parameter;

// send the transformation to the kTBS
console.log(JSON.stringify(transformation, null, 2));


