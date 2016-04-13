var express = require('express');
var mongojs = require('mongojs');
var router = express.Router();
var db = mongojs('contactlist', ['contactlist']);
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Contactlist_App'
  });
});
router.get('/contactlist', function(req, res) {
  console.log("I received get request");
  db.contactlist.find(function(err, docs) {
    console.log(docs);
    res.json(docs);
  });
});
router.post('/contactlist',function(req,res){
  console.log(req.body);
  db.contactlist.insert(req.body,function(err,doc){
    res.json(doc);
  });
});
router.delete('/contactlist/:id',function(req,res){
  var id=req.params.id;
  db.contactlist.remove({_id:mongojs.ObjectId(id)},function(err,doc){
    res.json(doc);
  });
});
router.get('/contactlist/:id', function(req, res) {
  var id=req.params.id;
  db.contactlist.findOne({_id:mongojs.ObjectId(id)},function(err,doc){
    res.json(doc);
  });
});

router.put('/contactlist/:id',function(req,res){
  var id=req.params.id;
  console.log(req.body.name);
  db.contactlist.findAndModify({query:{_id:mongojs.ObjectId(id)},
      update:{$set: {name:req.body.name,email:req.body.email,number:req.body.number}},
      new:true},function(err,doc){
        console.log(doc);
        res.json(doc);
  });
});
module.exports = router;
