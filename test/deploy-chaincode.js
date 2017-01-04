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

var postData = JSON.stringify(
{
  jsonrpc: '2.0',
  method: 'deploy',
  params: {
    type: 1,
    chaincodeID: {
      path: 'https://github.com/KennethNagin/blockchain_metering_service/chaincode'
    },
    ctorMsg: {
      function: 'init',
       args: [
        'hello_world initialized'
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
    console.log('Completed deply.');
  });
});

req.on('error', (e) => {
  console.log(`problem with request: ${e.message}`);
});

// write data to request body
req.write(postData);
req.end();

