const express = require('express');
const router = express.Router();
const client = require('prom-client');
const { register } = require('../metrics.js');

router.get('/', async (req, res) => {
    res.set('Content-Type', client.register.contentType);
    res.end(await register.metrics());
});

module.exports = router;