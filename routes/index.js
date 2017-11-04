var express = require('express');
var router = express.Router();
var firebase = require('firebase');
var config = {
    apiKey: "AIzaSyChl4nY8b_RaEtoNkgJ8bdQtyUR3BHRrC4",
    authDomain: "givingjs.firebaseapp.com",
    databaseURL: "https://givingjs.firebaseio.com",
    projectId: "givingjs",
    storageBucket: "givingjs.appspot.com",
    messagingSenderId: "668951114378"
  };
firebase.initializeApp(config); 

var publishReport = function(data){
  var db = firebase.database();
  var refReport = db.ref().child('/reports');
  // add data
  var newReport = refReport.push();
  newReport.set({
    location: data.location,
    category: data.category,
    date: data.date
  });
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {});
});
router.get('/reportProblem', function(req, res, next) {
  res.render('reportForm', {});
});
router.get('/reports', function(req, res, next) {
  res.render('reports', {});
});
router.get('/info', function(req, res, next) {
  res.render('info', {});
});
router.post('/report/submit', function(req, res, next) {
  // report data
  var dataReport = {
    location: req.body.address,
    category: req.body.selectCategory,
    date: req.body.date
  };
  // submit a report
  publishReport(dataReport);
  res.redirect('/');
});
router.post('/search/reports', function(req, res, next) {
  var getReports = firebase.database().ref('/reports').once('value').then(function(snapshot){
        var reports =[];
        snapshot.forEach(function(report){
          if(req.body.address === report.val()['location'])
            reports.push({'report' : report.val()});
        });
        return reports;
    });
    Promise.all([getReports]).then(function(results){
      res.render('info',{reports: results[0], input: req.body.address});
    });
});

module.exports = router;
