const https = require('https');
const querystring = require('querystring');
var date = new Date();
/*
var options = {
  hostname: 'c1bdbab254a44bb6be11653e6169b09f-vp0.us.blockchain.ibm.com',
  port: 5001,
  path: '/chain/blocks/1',
  method: 'GET'
};

var req = https.request(options, (res) => {
  console.log('statusCode:', res.statusCode);
  console.log('headers:', res.headers);

  res.on('data', (d) => {
    process.stdout.write(d);
  });
});

req.on('error', (e) => {
  console.error(e);
});
req.end();
*/
var chaincodeID_name = '3aeb9793d67968f966f2b093c361c70cdbf7a2813a02f7a5da344386580d3b519899b73003b335c587e3d016d44b54eb7d8030bddddbc3e9abf05db81c20eaef'
var postData = JSON.stringify(
{
  jsonrpc: '2.0',
  method: 'query',
  params: {
    type: 1,
    chaincodeID: {
      name: chaincodeID_name
    },
    ctorMsg: {
      function: 'read',
       args: [
        'hello_world'
      ]
    },
    secureContext: 'user_type1_1'
  },
  id: 0

});


console.log(postData);
var options = {
  hostname: 'c1bdbab254a44bb6be11653e6169b09f-vp0.us.blockchain.ibm.com',
  port: 5001,
  path: '/chaincode',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

var req = https.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
  res.on('end', () => {
    console.log('Completed read.');
  });
});

req.on('error', (e) => {
  console.log(`problem with request: ${e.message}`);
});

// write data to request body
req.write(postData);
req.end();


postData = JSON.stringify(
{
  jsonrpc: '2.0',
  method: 'invoke',
  params: {
    type: 1,
    chaincodeID: {
      name: chaincodeID_name
    },
    ctorMsg: {
      function: 'write',
       args: [
        'hello_world',
		'changing times: ' + date.getHours()
      ]
    },
    secureContext: 'user_type1_1'
  },
  id: 0

});
console.log(postData);

options = {
  hostname: 'c1bdbab254a44bb6be11653e6169b09f-vp0.us.blockchain.ibm.com',
  port: 5001,
  path: '/chaincode',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

req = https.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
  res.on('end', () => {
    console.log('Completed Write.');
  });
});

req.on('error', (e) => {
  console.log(`problem with request: ${e.message}`);
});
// write data to request body
req.write(postData);
req.end();
