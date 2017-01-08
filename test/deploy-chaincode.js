const https = require('https');
const fs = require('fs');
var date = new Date();


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
  var body = '';
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
	body += chunk;
  });
  res.on('end', () => {
    console.log('Completed deply.');
	var responseBody = JSON.parse(body)
    console.log(`result: ${JSON.stringify(responseBody.result)}`); 
	fs.writeFile("CHAINCODEID", responseBody.result.message, function(err) {
    if(err) {
        return console.log(err);
    }


  });
});

req.on('error', (e) => {
  console.log(`problem with request: ${e.message}`);
});

// write data to request body
req.write(postData);
req.end();


