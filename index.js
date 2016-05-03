const fs = require('fs');
const ktbs = require('./ktbs');

fs.readFile('./resources/evaluation-1-jsonld.jsonld', (err, data) => {
  if (err) { throw err; }
  const statement1 = JSON.parse(data);
  // console.log(statement1);
  // console.log('statement1 readed.');
});

ktbs.deleteX({
  path: '/base1/t1/',
});
ktbs.deleteX({
  path: '/base42/',
});
ktbs.postBase({
  basename: 'base42/',
});
ktbs.postTrace({
  basepath: '/base1/',
  tracename: 't1/',
});

