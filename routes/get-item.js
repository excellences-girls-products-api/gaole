var express = require('express');
var fs = require('fs');
var isContained = require('../condition/is-exist-id');

var router = express.Router();

router.get('/:id', function (req, res, next) {
    var id = req.params.id;
    readData(res, id, next);
});

function readData(res, id, next) {
    fs.readFile('./fixtures.json', 'UTF-8', function (err, data) {
        if (err) return next(err);

        var items = JSON.parse(data);

        if (false === isContained(items, res, id))
            return;

        selectItem(items, id, res);
    });
}

function selectItem(items, id, res) {
    for (var i = 0; i < items.length; i++) {
        if (items[i].id === parseInt(id)) {
            res.status(200).json({
                id: items[i].id,
                barcode: items[i].barcode,
                name: items[i].name,
                unit: items[i].unit,
                price: items[i].price
            });
            break;
        }
    }
}

module.exports = router;
