const express = require('express');
var bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
router = express.Router();
var rdp = require('node-rdpjs');


router.post('/checkcredentials', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var email = req.body.email;
    var password = req.body.pass;
    __redisConfig.client.hgetall(email, (error, obj) => {
        if (error) {
            res.send('error');
        }
        else if (!error) {
            if (!obj) {
                res.send('INCORRECT_CREDENTIALS');
            }
            else if (obj) {
                if (obj.pass == password) {
                    res.send('CORRECT_CREDENTIALS');
                }
                else {
                    res.send('INCORRECT_CREDENTIALS');
                }
            }

        }
    });

});

router.post('/update_status', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    email = req.body.email;
    __redisConfig.client.hset(email, ['up', '1']);
    __redisConfig.client.hset(email, ['url', req.body.url]);
});



router.post('/displayquery', (req, res) => {
    //Code for displaying server stats here

});

router.get('/', (req, res) => {
    res.send('HERE THE THE LIST OF API:');
});

router.post('/updateenginestatus', (req, res) => {
    var engine = req.body.engine;
    var machine_add = req.body.machine_add;
    console.log(engine);
    __redisConfig.client.sadd(engine, machine_add, function (err, reply) {
        if (!err) {
            res.send('OK').status(200);
            console.log('THE STATUS OF ' + engine + ' HAS BEEN PUSHED TO THE SERVER');
        }
    })

});

router.get('/rdp/:id', (req, res) => {
    var id = req.params.id;
    __redisConfig.client.hgetall(id, (err, reply) => {
        url = reply.url;

    });
});

module.exports = router;