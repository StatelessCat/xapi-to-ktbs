/* eslint-disable no-console */
var Hjson = require('hjson');
//const ktbs = require('./lib/ktbs');
const http = require('http');
const fs = require('fs');

var source_trace_uri = process.argv[2] || 't1/';
var computed_trace_uri = process.argv[3] || 'prov_trace42/';
var computed_trace_model_uri = process.argv[4] || 'http://localhost:8001/b1/nomodel';

if (!process.argv[2] || !process.argv[3] || !process.argv[4]) {
  console.log('node xapi-to-prov.js <source trace> <computed trace URI> <computed trace model>');
} else {

  // read resources/xapi-to-prov-mapping.hjson
  const XAPI_TO_PROV_MAPPING_PATH = './resources/xapi-to-prov-mapping.hjson';
  const mapping_hjson = fs.readFileSync(XAPI_TO_PROV_MAPPING_PATH, 'utf8');
  const mapping_array = Hjson.parse(mapping_hjson);
  // console.log(Hjson.stringify(mapping_json));

  const transformation = {
    "@id": computed_trace_uri,
    "@type": "ComputedTrace",
    "hasSource": [ source_trace_uri ],
    "hasMethod": "k:translation"
  };

  var x = mapping_array.map(({xapi, prov}) => {
    let x = "http://semweb.mmlab.be/ns/tincan2prov/" + xapi;
    let p = "http://www.w3.org/ns/prov#" + prov;
    return "\""+x+"\": \""+p+"\"";
  });
  let map = "map={" + x.join(",") + "}";
  let model = "model=" + computed_trace_model_uri;
  let parameter = [model, map];
  // console.log(parameter);

  // add it to the transformation object litteral
  transformation.parameter = parameter;
  let payload = JSON.stringify(transformation);

  // send the transformation to the kTBS
  var options = {
    hostname: 'localhost',
    port: 8001,
    path: '/b1/',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload)
    }
  };
  var req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`);
    });
    res.on('end', () => {
      console.log('No more data in response.');
    });
  });

  req.on('error', (e) => {
    console.log(`problem with request: ${e.message}`);
  });

  // write data to request body
  req.write(payload);
  req.end();
}
