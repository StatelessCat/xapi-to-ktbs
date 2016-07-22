const fs = require("fs");
const ktbs = require("fs");

const STATEMENT_PATH = './resources/xapi-to-prov-mapping.hjson';
const statement = fs.readFileSync(STATEMENT_PATH, 'utf8');

const XAPI_TO_KTBS_MODEL_PATH = './resources/xapi-ktbs-model.ttl';
const model = fs.readFileSync(XAPI_TO_KTBS_MODEL_PATH, 'utf8');

ktbs.deleteX({path: '/b1/joinRelated1/'});
ktbs.deleteX({path: '/b1/m1'});
ktbs.deleteX({path: '/b1/t1/'});
ktbs.deleteX({path: '/b1/'});
ktbs.postBase({basename: 'b1/'});
ktbs.postModel({
  path: '/b1/',
  headers: {'Content-Type': 'text/turtle'},
  payload: model
});
ktbs.postTrace({
  basepath: '/b1/',
  tracename: 't1/',
  hasModel: '/b1/m1'
});
// post obsels here


