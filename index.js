const fs = require('fs');
const ktbs = require('./ktbs');

fs.readFile('./resources/evaluation-1-jsonld.jsonld', (err, data) => {
  if (err) { throw err; }
  const statement1 = JSON.parse(data);
  // console.log(statement1);
  // console.log('statement1 readed.');
});

// ktbs.deleteTrace();
ktbs.deleteBase();
ktbs.postBase();
ktbs.postTrace();

