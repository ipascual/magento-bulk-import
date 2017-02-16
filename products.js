var fs = require('fs');
var faker = require('faker')
var parse = require('csv-parse');
var stringify = require('csv-stringify');
var csv = require('csv');
var stringifier = csv.stringify({ header: true });

var getHeaders = parse({columns: true, delimiter: ','}, function(err, data) {
  return Object.keys(data).map(function (key) {
    return record[key];
  });
});

var xxx = csv.transform(function(data) {
  return Object.keys(record).map(function (key) {
    return record[key];
  });
});

var stringifyHeaders = stringify({header: true});

var writeStream = fs.createWriteStream('file.csv');


fs.createReadStream(__dirname+'/product-sample.csv').pipe(getHeaders).pipe(stringifyHeaders).pipe(process.stdout);



  // csv.transform(data, function(data){
  //   for(i=0;i<10;i++) {
  //     data.sku = 'T-Shirt_' + faker.fake("{{address.city}}").replace(/\s/g, '') + '_' + faker.random.uuid();
  //     data.price = Math.random() * (1000 - 10) + 10;
  //     data.created_at = '';
  //     data.updated_at = '';
  //     data.qty = Math.random() * (1000 - 100) + 100;
  //     data.visibility = 'Catalog, Search';
  //     return data;
  //   }
  // }, function(err, data){
  //   csv.stringify(data, function(err, data){
  //     console.log(err);
  //     process.stdout.write(data);
  //   });
  // });
// });

