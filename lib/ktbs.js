/* eslint-disable no-console */
const http = require('http');

const HOSTNAME = 'localhost';
const PORT = 8001;

var deleteX = function(opt) {
  return new Promise(
    function (resolve, reject) {
      const path = opt.path || '';
      const deleteBaseOptions = {
        hostname: HOSTNAME,
        port: PORT,
        path: path,
        method: 'DELETE'
      };
      const deleteReq = http.request(deleteBaseOptions, (res) => {
        console.log(`STATUS: ${res.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          console.log(`BODY: ${chunk}`);
        });
        res.on('end', () => {
          console.log(`${HOSTNAME}:${PORT}${path} deleted`);
          resolve(`${HOSTNAME}:${PORT}${path} deleted`);
        });
      });
      deleteReq.on('error', (e) => {
        reject(`problem with request: ${e.message}`);
      });
      deleteReq.end();
    });
};

var postX = function(opt) {
  return new Promise(
    function (resolve, reject) { // (A)
      const payload = opt.payload || '';
      const path = opt.path || '';
      opt.headers = opt.headers || {};
      opt.headers['Content-Type'] = opt.headers['Content-Type'] ||
        'application/json';
      const options = {
        hostname: 'localhost',
        port: 8001,
        path: path,
        method: 'POST',
        headers: {
          'Content-Type': opt.headers['Content-Type'],
          'Content-Length': payload.length
        }
      };
      const req = http.request(options, (res) => {
        console.log(`STATUS: ${res.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
        res.setEncoding('utf8');
        var acc = '';
        res.on('data', (chunk) => {
          acc += chunk;
        });
        res.on('end', () => {
          resolve(acc);
        });
      });
      req.on('error', (e) => {
        console.log(`problem with request: ${e.message}`);
        reject(`problem with request: ${e.message}`);
      });
      req.write(payload);
      req.end();
    });
};

var postBase = function(opt) {
  const data = JSON.stringify({
    '@id': opt.basename,
    '@type': 'Base',
    label: 'My new base'
  });
  opt.payload = data;
  opt.path = '';
  return postX(opt);
};

var postModel = function(opt) {
  return postX(opt);
};

var postTrace = function(opt) {
  opt.path = opt.basepath || '/b1/';
  const hasModel =
    opt.hasModel || 'http://liris.cnrs.fr/silex/2011/simple-trace-model/';
  opt.payload = JSON.stringify({
    '@id': opt.tracename,
    '@type': 'StoredTrace',
    hasModel: hasModel,
    origin: '1970-01-01T00:00:00Z'
  });
  return postX(opt);
};

var postObsel = function(opt) {
  return postX(opt);
};

var postComputedTrace = function(opt) {
  opt.path = '/b1/';
  opt.headers = opt.headers || {};
  opt.headers['Content-Type'] = 'application/turtle';
  return postX(opt);
};

var to_obsels = function(args) {
  return new Promise(
    function (resolve, reject) {
      if (! args.statement || ! args.id)
        reject("! args.statement || ! args.id");
      const statement = args.statement;
      
      var ss2 = JSON.parse(JSON.stringify(statement));
      ss2["@id"] = args.id;
      ss2["@type"] = ["m:xapiStatement", statement["@type"]];
      // ^ TODO handle the case of ss1["@type"] is an array
      ss2["hasTrace"] = "./";
      ss2["beginDT"] = ss2.timestamp;
      ss2["endDT"] = ss2.timestamp;
      ss2["@context"] = [
        "http://liris.cnrs.fr/silex/2011/ktbs-jsonld-context",
        statement["@context"],
        { "m": "http://localhost:8001/b1/m1#" }
      ];
      // Note the order of @context declarations
      //  ktbs context must be specified before the tincan2prov one
      resolve(ss2);
    });
};


exports.deleteX = deleteX;
exports.postBase = postBase;
exports.postModel = postModel;
exports.postTrace = postTrace;
exports.postObsel = postObsel;
exports.postComputedTrace = postComputedTrace;
exports.to_obsels = to_obsels;

