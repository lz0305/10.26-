var express = require('express');
var router = express.Router();
var fs=require("fs");

/* GET home page. */
router.post('/', function(req, res, next) {
    res.header('Access-Control-Allow-Origin','*');
    fs.readFile('public/write.txt','utf-8',function (err, sj) {
        var sj=JSON.parse(sj);
        res.send({data:sj});
    });
});

router.post('/home', function(req, res, next) {
    res.header('Access-Control-Allow-Origin','*');
    console.log(req.body.name);
    console.log(req.body.name);
    fs.readFile('public/write.txt','utf-8',function (err, data) {
        var arr=JSON.parse(data);
        arr.push({name:req.body.name,message:req.body.message});
        console.log(arr);
        fs.writeFile('public/write.txt',JSON.stringify(arr),function (err) {
            fs.readFile('public/write.txt','utf-8',function (err, sj) {
                var sj=JSON.parse(sj);
                res.send({data:sj});
            });
        })
    })
});

router.post('/delete', function(req, res, next) {
    res.header('Access-Control-Allow-Origin','*');
    fs.readFile('public/write.txt','utf-8',function (err, data) {
        var sj=JSON.parse(data);
        for(i in sj){
            var t=sj[i];
            for(i in t){
              if(t[i]==req.body.sc){
                  sj.splice(i,1);
                  console.log(sj)
                  res.send('删除');
                  fs.writeFileSync('public/write.txt',JSON.stringify(sj));
              }

            }
        }
    });
});
module.exports = router;
