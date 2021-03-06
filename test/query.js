const https = require('https');
const fs = require('fs');
const stdio = require('stdio')
var date = new Date();

var param = process.argv[2];
var chaincodeIDPath = __dirname + "/chaincodeID";
var chaincodeID = fs.readFileSync(chaincodeIDPath, 'utf8');
chaincodeID = chaincodeID.trim(); 
console.log('Param: ' + param);
var postData = JSON.stringify(
{
  jsonrpc: '2.0',
  method: 'query',
  params: {
    type: 1,
    chaincodeID: {
      name: chaincodeID
    },
    ctorMsg: {
      function: 'read',
       args: [
        param
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


