var https = require('https');
let remotehost = "api.example.com";

exports.handler = async (event, context) => {
  if(event.httpMethod === 'OPTIONS'){
    let response = {
            statusCode: 200,
            headers: {
              'access-control-allow-origin': event.headers.origin || '*',
              'access-control-allow-headers': 'Origin, X-Requested-With, Content-Type, Accept, authorization'
            },
    };
    return response;
  }
  else{
    for(let key in event.headers) {
      if(key.match(/host|origin|cookie/ig)){
        delete event.headers[key];
      }
    }
    let config = {
      host: remotehost,
      path: event.path,
      followAllRedirects: true,
      method: event.httpMethod,
      headers: event.headers,
      gzip: true
    };
    if(event.httpMethod !== 'HEAD') {
      config.body = event.body;
      config.headers["content-length"] = config.body.length;
    }
    console.log(config);
    return new Promise((resolve, reject) => {
        const req = https.request(config, (r) => {
          let body = '';
          console.log(r);
          r.headers['access-control-allow-origin'] = '*';
          r.headers['access-control-allow-headers'] = 'Origin, X-Requested-With, Content-Type, Accept, authorization';
           r.on('data', function(chunk) {
             if (chunk){
               body += chunk;
             }
          });
          r.on('end', function() {
             let response = {
               statusCode: r.statusCode,
               headers: r.headers,
               body: body
             }
             console.log(response);
             resolve(response);
          });
        });
        
        req.on('error', (e) => {
          console.log(e.message)
          reject(e.message);
        });

        // send the request
        req.write(config.body);
        req.end();
    });  
  }
};