var express      = require('express'),
    app          = express(),
    http         = require('http'),
    path         = require('path'),
    body         = require('body-parser'),
    cfenv        = require('cfenv'),
    ibmbluemix   = require('ibmbluemix'),
    IBMData      = require('ibmdata'),
    IBMPush      = require('ibmpush'),
    ibmcloudcode = require('ibmcloudcode'),
    Client       = require('ibmiotf'),
    namespace    = require('express-namespace');


// IBM Bluemix app id config
var config = {
    // change to real application route assigned for your application
    applicationRoute : "cierra.mybluemix.net",
    // change to real application ID generated by Bluemix for your application
    applicationId : "295033ac-e5ad-4769-bc20-9fc1711b813f"
};

app.use(body.json());
app.use(body.urlencoded({ extended: true }));

var appEnv = cfenv.getAppEnv();

var iotConfig;
var baseConfig = appEnv.getServices('cel_cierra_iot');

if(!baseConfig || Object.keys(baseConfig).length == 0) {
    var configJSON = require('./cierra_vcap.json');
    configJSON["iotf-service"].forEach(function(entry) {
        if( entry.name == 'cel_cierra_iot' ){
            iotConfig = entry;
        }
    })
}
else{
    iotConfig = baseConfig['cel_cierra_iot'];
}

// IBM Watson IoT appclient config
var appClientConfig = {
    "org": "1555wo",
    "id": "homePi",
    "domain": "internetofthings.ibmcloud.com",
    "type": "pi_cierra",
    "auth-method": "apikey",
    "auth-key": iotConfig.credentials.apiKey,
    "auth-token": iotConfig.credentials.apiToken
};

// init core sdk
ibmbluemix.initialize(config);
var logger = ibmbluemix.getLogger();

// initialize Watson iot connector
var appClient = new Client.IotfApplication(appClientConfig);

// all environments 
app.set('host', process.env.VCAP_APP_HOST || 'localhost'); 
app.set('port', process.env.VCAP_APP_PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// init service sdks 
app.use(function(req, res, next) {
    req.data = IBMData.initializeService(req);
    req.push = IBMPush.initializeService(req);
    next();
});


// connect to the IBM Watson IoT platform
appClient.connect();
console.log('IOTF is set!');

appClient.log.setLevel = 'info';

// device connect event
appClient.on('connect', function(){
    console.log('Device connected!');

    var myData = { 'name': 'arya', 'role': 'architect' };

    // subscribe to device events
    appClient.subscribeToDeviceEvents("pi_cierra");
    // subscribe to device status
    appClient.subscribeToDeviceStatus("pi_cierra");
    // now, publishing event
    setInterval(function(){
        appClient.publishDeviceEvent("pi_cierra", "homePi", "status", "json", myData);
    }, 1000);
});

// device response event
appClient.on("deviceEvent", function(deviceType, deviceId, eventType, format, payload){
    console.log("Device Event from :: "+deviceType+" : "+deviceId+" of event "+eventType+" with payload : "+payload);
});

// device error event
appClient.on('error', function(){
    console.log('Error occurred');
});

// init basics for an express app
app.use(require('./lib/setup'));

var ibmconfig = ibmbluemix.getConfig();
// "Require" modules and files containing endpoints and apply the routes to our application
app.use(ibmconfig.getContextRoot(), require('./lib/staticfile'));

logger.info('mbaas context root: '+ibmconfig.getContextRoot());

app.listen(ibmconfig.getPort());
logger.info('Server started at port: '+ibmconfig.getPort());
