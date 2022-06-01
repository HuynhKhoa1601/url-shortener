require('dotenv').config();
const express = require('express');
const validUrl = require('valid-url');
const cors = require('cors');
const app = express();
const dns = require('dns');
let bodyParser = require('body-parser');
let http = require("http");
let mongoose;
try {
  mongoose = require("mongoose");
} catch (e) {
  console.log(e);
}
const router = express.Router();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.get("/is-mongoose-ok", function (req, res) {
  if (mongoose) {
    res.json({ isMongooseOk: !!mongoose.connection.readyState });
  } else {
    res.json({ isMongooseOk: false });
  }
});
const TIMEOUT = 10000;
const URLs = require("./myApp.js").urlModel;

const createAndSaveURL = require("./myApp.js").createAndSaveURL;
const findOneByLongURL = require("./myApp.js").findOneByLongURL;
const findOneByShortURL = require("./myApp.js").findOneByShortURL;

app.get("/create-and-save-url", function (req, res, next) {
  console.log('Hello');
  // in case of incorrect function use wait timeout then respond
});

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
// app.post('/api/shorturl', function(req, res) {
//   console.log(req.value);
//   res.json({ greeting: 'ds' });
// });
let check = true;
app.post('/api/shorturl', bodyParser.urlencoded({extended: false}),function (req,res) {
  if (validUrl.isUri(req.body.url)){
    console.log('Looks like an URI');
    const url = new URL(req.body.url);
    let hostURL = url.hostname;
    console.log(hostURL);
    dns.lookup(hostURL, err => {
      if (err){
        res.json({ error: 'invalid url' })
      }else {
        console.log('Found');
        let replaceURL = req.body.url;
        findOneByLongURL(replaceURL,function (err,data){
           if (data == null | !data){
                  let shortURL;
                  shortURL = Math.floor(Math.random()*1000);
                  console.log(shortURL);
                  findOneByShortURL(shortURL,function (err, data) {
                    console.log(data);
                  })

                  createAndSaveURL(req.body.url,shortURL,function (err, data) {
                      if (err) {
                        return next(err);
                      }
                      if (!data) {
                        console.log("Missing `done()` argument");
                        return next({ message: "Missing callback argument" });
                      }
                      
                      res.json({original_url: req.body.url,shorten_url:shortURL});
                });
            }
        })
      }
    });
  } 
  else {
    res.json({ error: 'invalid url' })
  }
  
  
})

app.get('/api/shorturl/:short_url', bodyParser.urlencoded({extended: false}),function (req,res) {
  let queryUrl = req.params.short_url;
  findOneByShortURL(+queryUrl,function (err, data) {
    res.redirect(data.original_url);
  })
})



app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
