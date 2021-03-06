/* eslint-disable no-console */
/* globals Promise:true */
const http = require('http');
const N3 = require('n3');
const fs = require('fs');
var jsonld = require('jsonld');
const deterministic_stringify = require('json-stable-stringify');

const FRAME_PATH = './resources/framing/frame.json';
var frame_str = fs.readFileSync(FRAME_PATH, 'utf8');
var frame_ = JSON.parse(frame_str);

const XAPI_CONTEXT_PATH = './resources/tincan2prov/tincan2prov.jsonld';
var xapi_context_str = fs.readFileSync(XAPI_CONTEXT_PATH, 'utf8');
var xapi_context = JSON.parse(xapi_context_str);

const OUT_PATH = './resources/out/';
const OUT_FRAMED_PATH = './resources/out-framed/';
const OUT_FRAMED_NORMALIZED_PATH = './resources/out-framed-normalized/';

new Promise(function(resolve, reject) {
  http.get({
    hostname: 'localhost',
    port: 8001,
    path: '/b1/t1/@obsels',
    method: 'GET',
    headers: {
      'Accept': 'text/plain'
    }
    // TODO app/ntriples ?
  }, (res) => {
    res.setEncoding('utf8');
    var acc = '';
    res.on('data', (chunk) => {
      acc += chunk;
    });
    res.on('end', () => {
      resolve(acc);
    });
    res.resume();
  }).on('error', (e) => {
    reject(e);
  });
}).then(function(at_obsels){
  return new Promise(function(resolve, reject) {
    jsonld.fromRDF(at_obsels, {format: 'application/nquads'}, function(err, doc) {
      if (err) {
        reject(err);
      }
      else {
        resolve(doc)
      }
    });
  });
}).then(function(at_obsels){
  return new Promise(function(resolve, reject) {
    const statements_nodes =  at_obsels.filter(function(node) {
      const is_a_statement = node['@type'] && node['@type'].filter(function(type) {
        return type === 'http://semweb.mmlab.be/ns/tincan2prov/Statement'
      }).length > 0;
      return is_a_statement;
    });

    console.log('----------')

    const statements_ids = statements_nodes.map(function(statement_node) {
      if (statement_node['http://semweb.mmlab.be/ns/tincan2prov/id']) {
        return statement_node['http://semweb.mmlab.be/ns/tincan2prov/id'][0]['@value'];
      } else {
        return false;
      }
    });
    if (statements_ids) {
      resolve(statements_ids);
    }
    else {
      reject({});
    }
  });
}).then(function(statements_ids) {
  statements_ids.forEach(function(statement_id) {
    return new Promise(function(resolve, reject) {
      http.get({
        hostname: 'localhost',
        port: 8001,
        path: '/b1/t1/' + statement_id,
        method: 'GET',
        headers: {
          'Accept': 'text/plain'
        }
        // TODO app/ntriples ?
      }, (res) => {
        res.setEncoding('utf8');
        var acc = "";
        res.on('data', (chunk) => {
          acc += chunk;
        });
        res.on('end', () => {
          resolve(acc);
        });
        res.resume();
      }).on('error', (e) => {
        reject(e);
      });
    }).then(function(ntriples){
      return new Promise(function(resolve, reject) {
        jsonld.fromRDF(ntriples, {format: 'application/nquads'}, function(err, doc) {
          const out_filename = OUT_PATH + 'eval-'
              + statement_id + '-out.json';
          fs.writeFile(out_filename, deterministic_stringify(doc, {space: 2}), (err) => {
            if (err) throw err;
          });
          jsonld.frame(doc, frame_, function(err, framed) {
            if (framed['@graph'][0]) {
              delete framed['@graph'][0]['@id'];
              jsonld.normalize(framed, {
                algorithm: 'URDNA2015',
                format: 'application/nquads'
              }, function (err, normalized) {
                const out_framed__normalized_filename = OUT_FRAMED_NORMALIZED_PATH + 'eval-' + statement_id + '-out-framed-normalized.n3';
                fs.writeFile(out_framed__normalized_filename, normalized, (err) => {
                  if (err) throw err;
                });
                // normalized is a string that is a canonical representation of the document
                // that can be used for hashing, comparison, etc.
              });
            }
          });
        });
      });
    });
  });
});

