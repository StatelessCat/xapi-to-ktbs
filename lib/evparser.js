/* eslint-disable no-console */
const fs = require('fs');
const cheerio = require('cheerio');
const deterministic_stringify = require('json-stable-stringify');

const X = './resources/tincan2prov/evaluation.html';
const html = fs.readFileSync(X, 'utf8');
const $ = cheerio.load(html);

const trs =  $('#contentContainer table tr td:nth-child(4)');
const acc = trs.map(function() {
  return $(this).text();
}).get();
const statements = acc.map(function(el_str) {
  const el_json = JSON.parse(el_str);
  const el_filename = 'resources/in/eval-' + el_json.id + '-tincan2prov.json';
  fs.writeFile(el_filename, deterministic_stringify(el_json, {space: 2}), (err) => {
    if (err) throw err;
  });
  return el_json;
});
// We got all JSON-LD Statements
const fusionned = {};
acc.forEach(function(statement) {
  Object.assign(fusionned, JSON.parse(statement));
});

exports.statements = statements;
// statements is an array of all JSON-LD statements from tincan2prov evaluator.

exports.fusionned = fusionned;
// fusionned is a no meaningfull statement that is just containing
//  a subset of all JSON keys of xAPI statements.

