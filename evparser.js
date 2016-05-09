/* eslint-disable no-console */
const fs = require('fs');
var cheerio = require('cheerio');

const X = './resources/tincan2prov/evaluation.html';
const html = fs.readFileSync(X, 'utf8');
const $ = cheerio.load(html);

var trs =  $('#contentContainer table tr td:nth-child(4)');
var acc = trs.map(function() {
  return $(this).text();
}).get();
// We got all JSON-LD Statements
acc.forEach(function(statement) {
  console.log('###');
  console.log(statement);
  console.log('###');
});

