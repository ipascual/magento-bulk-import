var fs = require('fs');
var q = require('q');
var faker = require('faker')
var parse = require('csv-parse');
var stringify = require('csv-stringify');
var csv = require('csv');
var stringifier = csv.stringify({ header: true });

(function () {
  'use strict';

  function getFakeProduct(data) {
    data.sku = 'T-Shirt_' + faker.fake("{{address.city}}").replace(/\s/g, '') + '_' + faker.random.uuid();
    data.price = Math.random() * (1000 - 10) + 10;
    data.created_at = '';
    data.updated_at = '';
    data.qty = Math.random() * (1000 - 100) + 100;
    data.visibility = 'Catalog, Search';
    return data;
  }

  var stream = fs.createWriteStream(__dirname + '/products-generated.csv');
  stream.once('open', function (fd) {
    fs.readFile(__dirname + '/product-sample.csv', 'utf8', function (err, data) {

      parse(data, {columns: true, delimiter: ',', from: 0, to: 1}, function (err, output) {
        output[0] = getFakeProduct(output[0]);
        csv.stringify(output, {header: true, delimiter: ','}, function (err, data) {
          stream.write(data);

          function loop(promise, fn) {
            return promise.then(fn).then(function (wrapper) {
              output[0] = getFakeProduct(output[0]);
              csv.stringify(output, {header: false, delimiter: ','}, function (err, data) {
                stream.write(data);
              });
              return !wrapper.done ? loop(q(wrapper.value), fn) : wrapper.value;
            });
          }

          loop(q.resolve(1), function (i) {
            console.log(i);
            return {
              done: i > 10,
              value: ++i
            };
          }).catch(function (err) {
            console.log(err);
          }).
          done(function () {
            stream.end();
          });

        });
      });
    });
  });

})();
