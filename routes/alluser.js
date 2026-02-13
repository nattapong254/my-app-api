var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User.js');

var metricsMiddleware = require('../middleware/metrics.middleware.js');
router.use(metricsMiddleware);


router.get('/all', async (req, res) => {
    try {
        var all = await User.find({})
        res.json(all)
    } catch (err) {
        res.json(err)
    };
});

router.get('/one=:id', async (req, res) => {
    try {
        var one = await User.findById(req.params.id)
        res.json(one)
    } catch (err) {
        res.json(err)
    };
});

router.get('/name=:name', async (req, res) => {
    try {
      const name = req.params.name;
      const users = await User.findOne({ name:name });
      res.json(users);
    } 
    catch (err) {
      res.json(err);
    };
});

router.post('/add', (req, res) => {
    var oneuser = new User(req.body);
    oneuser.save()
    .then(oneuser => {res.json(oneuser)});
    res.status(201).json({ created: true });
});

router.put('/name=:name', (req, res) => {
    User.findOneAndUpdate(
        {
            name: req.params.name
        },
        req.body,
        {
            name: true
        }
    )
    .then(oneuser => {res.json(oneuser)});
});

router.delete('/del=:name', (req, res) => {
    User.findOneAndDelete(
        { name: req.params.name },
        req.body
    )
    .then(deluser => {res.json(deluser)});
    res.json({ deleted: true });
});


module.exports = router;