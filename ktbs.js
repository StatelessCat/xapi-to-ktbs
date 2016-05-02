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

var postBase = function() {
  const postData = JSON.stringify({
    '@id': 'base1/',
    '@type': 'Base',
    label: 'My new base',
  });
  const options = {
    hostname: 'localhost',
    port: 8001,
    path: '',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': postData.length,
    },
  };
  const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`);
    });
    res.on('end', () => {
      console.log(`${HOSTNAME}:${PORT}${BASENAME} created`);
    });
  });
  req.on('error', (e) => {
    console.log(`problem with request: ${e.message}`);
  });
  req.write(postData);
  req.end();
};

exports.deleteBase = deleteBase;
exports.postBase = postBase;

