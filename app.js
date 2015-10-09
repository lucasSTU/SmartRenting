/**********
Node server to handle http requests and send poqt requests to a mail address
**********/
/*jslint node: true */
"use strict";

var express = require('express');
var multer = require('multer');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var mime = require('mime');
var crypto = require('crypto');
var moment = require('moment');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
      crypto.pseudoRandomBytes(16, function (err, raw) {
        cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
      });
  }
});
var upload = multer({storage: storage});
var app = express();
var transporter = nodemailer.createTransport({
    service: 'Hotmail',
    auth: {
        user: 'lucas_kennedy@hotmail.fr',
        pass: 'kamata91'
    }
});

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // for parsing application/json

moment().format();

var formToCsv = function(req) {
        var string =    "This is an automatic mail issued by SmartRentings' server.\n\n" +
                        "A new person has proposed his/her flat to your services.\n\n" +
                        "Instructions:\nCreate a .csv file with those lines at the beginning of it (without the quotes):\n" +
                        "\"sep=|\nDépart|Retour|Loyer|Prénom|Nom|Email|Téléphone|Adresse|Ville|Zipcode\"\n\n" +
                        "Line to Copy(with the quotes):\n";
        string += "\"" + req.departDay + "\"|\"" + req.returnDay + "\"|\"" + req.rent + "\"|\"" + req.name + "\"|\"" + req.surname + "\"|\"" +
            req.mail + "\"|\"" + req.phone + "\"|\"" + req.road + "\"|\"" + req.city + "\"|\"" + req.zipcode + "\"";
        return string;
};

app.get('/', function (req, res) {
  res.sendFile("./public/index.html", { root: __dirname });
});

app.post('/form', upload.array('photos',2), function (req, res) {
    res.writeHead(200);
    res.write(JSON.stringify({ result: "Post has succeded" }));
    console.log(req.body);
    var photos;
    if (req.files) {
        photos = [];
        for(var i= 0; i< req.files.length; i++) {
            var tmpPhoto = {
                filename: req.files[i].filename,
                path: req.files[i].path
            };
            photos.push(tmpPhoto);
        }
    }
    console.log(photos);
    console.log(formToCsv(req.body));
    var mailOptions = {
        from: 'lucas_kennedy@hotmail.fr',
        to: 'romain.bernard7@gmail.com',
        //to: 'luk.kennedy.lk@gmail.com',
        subject: 'Avancement du formulaire',
        text: formToCsv(req.body),
        attachments: photos ? photos : null
    };
    transporter.sendMail(mailOptions, function(error, info){
    if(error){
        res.end();
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
    res.end();

});
    res.end();
});

var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});