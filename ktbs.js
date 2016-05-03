const http = require('http');

const HOSTNAME = 'localhost';
const PORT = 8001;

var deleteX = function(opt) {
  const path = opt.path || '';
  const deleteBaseOptions = {
    hostname: HOSTNAME,
    port: PORT,
    path: path,
    method: 'DELETE',
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
    });
  });
  deleteReq.end();
};

var postX = function(opt) {
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

var postBase = function(opt) {
  const data = JSON.stringify({
    '@id': opt.basename,
    '@type': 'Base',
    label: 'My new base',
  });
  opt.payload = data;
  opt.path = '';
  postX(opt);
};

var postModel = function(opt) {
  postX(opt);
};

var postTrace = function(opt) {
  opt.path = opt.basepath || '/base1/';
  opt.payload = JSON.stringify({
    '@id': opt.tracename,
    '@type': 'StoredTrace',
    hasModel: 'http://liris.cnrs.fr/silex/2011/simple-trace-model/',
    origin: '1970-01-01T00:00:00Z',
  });
  postX(opt);
};

exports.deleteX = deleteX;
exports.postBase = postBase;
exports.postModel = postModel;
exports.postTrace = postTrace;

