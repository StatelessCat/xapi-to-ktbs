const http = require('http');

const HOSTNAME = 'localhost';
const PORT = 8001;
const BASENAME = '/base1/';

var deleteBase = function() {
  const deleteBaseOptions = {
    hostname: HOSTNAME,
    port: PORT,
    path: BASENAME,
    method: 'DELETE',
  };
  const deleteBaseReq = http.request(deleteBaseOptions, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`);
    });
    res.on('end', () => {
      console.log(`${HOSTNAME}:${PORT}${BASENAME} deleted`);
    });
  });
  deleteBaseReq.end();
};

var postX = function(opt) {
  const payload = opt.payload || {};
  const path = opt.path || '';
  const options = {
    hostname: 'localhost',
    port: 8001,
    path: path,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': payload.length,
    },
  };
  const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`);
    });
  });
  req.on('error', (e) => {
    console.log(`problem with request: ${e.message}`);
  });
  req.write(payload);
  req.end();
};

var postBase = function() {
  const data = JSON.stringify({
    '@id': 'base1/',
    '@type': 'Base',
    label: 'My new base',
  });
  postX({payload: data, path: ''});
};

var postTrace = function() {
  const data = JSON.stringify({
    '@id': 't01/',
    '@type': 'StoredTrace',
    hasModel: 'http://liris.cnrs.fr/silex/2011/simple-trace-model/',
    origin: '1970-01-01T00:00:00Z',
  });
  postX({payload: data, path: '/base1/'});
};

exports.deleteBase = deleteBase;
exports.postBase = postBase;
exports.postTrace = postTrace;

