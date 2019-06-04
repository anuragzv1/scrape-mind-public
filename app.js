
/*
 * Modules Included : Express, Cron, Queue, Async, Request, Deasync; Deasync All calls here untill Server Initializes
 */
const fs = require('fs');
const path = require('path');
const deasync = require('deasync');
const readConfig = require('jsonfile').readFileSync;

//Load Config File
try {
    var config = readConfig(process.argv[2] || "config.json");
} catch (e) {
    console.log("[error] " + new Date().toGMTString() + " : Server Config Not Found.");
    return process.exit(-1);
}
global.__redisConfig = config.redisConfig;
//Global Inspection Function
global.__inspect = function (obj, stringify) {
    console.log("[inspect] " + new Date().toGMTString() + " : OBJECT => ", ((stringify) ? JSON.stringify(obj) : obj));
    return obj;
}
global.__logPath = config.paths.logs || "./logs";

//Global Variable
process.env.NODE_ENV = config.currentEnv;
global.__namespace = config.namespace;
global.__asset_namespace = config.asset_namespace;
global.__ENV_LIST = config.environments;
// Create Project Directories if Not exists
const dirs = [__logPath];
dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
});
//Set logger
if (process.env.NODE_ENV == global.__ENV_LIST.development) {
    //Global Debug Function
    global.__debug = function (msg, obj, stringify) {
        if (obj)
            console.log("[debug] " + new Date().toGMTString() + " : " + msg + " => ", ((stringify) ? JSON.stringify(obj) : obj));
        else
            console.log("[debug] " + new Date().toGMTString() + " : " + msg);
        return obj;
    }

    //Global Error Function
    global.__error = function (msg, obj) {
        var data;
        if (obj)
            console.log("[error] " + new Date().toGMTString() + " : " + msg + " => ", obj.stack || JSON.stringify(obj));
        else
            console.log("[error] " + new Date().toGMTString() + " : " + msg);
        return obj;
    }

    //Global Info Function
    global.__info = function (msg, obj, stringify) {
        if (obj)
            console.log("[info] " + new Date().toGMTString() + " : " + msg + " => ", ((stringify) ? JSON.stringify(obj) : obj));
        else
            console.log("[info] " + new Date().toGMTString() + " : " + msg);
        return obj;
    }
    //Global Security Function
    global.__security = function (ip, msg, obj, stringify) {
        if (obj)
            console.log("[security] " + new Date().toGMTString() + " : " + ip + " : " + msg + " => ", ((stringify) ? JSON.stringify(obj) : obj));
        else
            console.log("[security] " + new Date().toGMTString() + " : " + ip + " : " + msg);
        return obj;
    }
} else {
    //Global Debug Function
    global.__debug = function (msg, obj, stringify) {
        if (obj)
            data = ("[debug] " + new Date().toGMTString() + " : " + msg + " => ", ((stringify) ? JSON.stringify(obj) : obj));
        else
            data = ("[debug] " + new Date().toGMTString() + " : " + msg);
        fs.appendFileSync(_logPath + '/debug' + (new Date()).toISOString().split(/[-:]/i).slice(0, 3).join('') + '.log', data)
        return obj;
    }

    //Global Error Function
    global.__error = function (msg, obj) {
        if (obj)
            data = ("[error] " + new Date().toGMTString() + " : " + msg + " => ", obj.stack || JSON.stringify(obj));
        else
            data = ("[error] " + new Date().toGMTString() + " : " + msg);
        fs.appendFileSync(_logPath + '/error' + (new Date()).toISOString().split(/[-:]/i).slice(0, 3).join('') + '.log', data)
        return obj;
    }

    //Global Info Function
    global.__info = function (msg, obj, stringify) {
        if (obj)
            data = ("[info] " + new Date().toGMTString() + " : " + msg + " => ", ((stringify) ? JSON.stringify(obj) : obj));
        else
            data = ("[info] " + new Date().toGMTString() + " : " + msg);
        fs.appendFileSync(_logPath + '/info' + (new Date()).toISOString().split(/[-:]/i).slice(0, 3).join('') + '.log', data)
        return obj;
    }

    //Global Security Function
    global.__security = function (ip, msg, obj, stringify) {
        if (obj)
            data = ("[security] " + new Date().toGMTString() + " : " + ip + " : " + msg + " => ", ((stringify) ? JSON.stringify(obj) : obj));
        else
            data = ("[security] " + new Date().toGMTString() + " : " + ip + " : " + msg);
        fs.appendFileSync(_logPath + '/security' + (new Date()).toISOString().split(/[-:]/i).slice(0, 3).join('') + '.log', data)
        return obj;
    }
}

global.__redisConfig = config.redisConfig;
const express = require('express');
var bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
const port = config.port || 6000
const hbs = require('hbs');

__redisConfig.client = require('redis').createClient();

//Internal modules
const db = require('./routes/models/dbfunction');
const api = require('./routes/controllers/apis');

//Express middlewares
app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static('views/'));
app.set('view engine', 'hbs');
app.use('/api', api);


//Configuration page for particular client
app.get('/config/:id', (req, res) => {
    var id = req.params.id;
    res.render('config', {
        id: req.params.id
    });
});

app.get('/live', (req, res) => {

    res.render('live', {
        data: "here's the list of live hosts.",
        results: results
    });

});
app.listen(port, () => {
    console.log(`Started server at ${port} port`);
})