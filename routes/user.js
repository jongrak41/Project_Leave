var express = require('express');
var router = express.Router(); 
var requestG = require('request');
var bcrypt = require('bcrypt-nodejs');
var mysql = require('mysql');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);

var session = require('express-session');

router.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

function Linenotify (messageG){   //ฟังชั่น linenotify
  var token ='c6JHAEwgfdpmmHzUBciocLXdhNfwSDLWGrfJuBAL5mX'
  requestG(
    {
        method: 'POST',
        uri: 'https://notify-api.line.me/api/notify',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        auth: {
          'bearer': token
        },
        form: {
          message: messageG
        }
    }
) 
}


router.get('/leave',isLoggedIn, function(req,res){
  if(req.user.permission == 'Admin'){
    res.render('leave-admin',{
      user:req.user
     })
  }
  else{
    res.render('leave',{
      user:req.user
     })
  }
})

router.post('/insertleave', function(req,res){
  var name = req.user.name
  var surname = req.user.surname
  var Regis_ID = req.user.Regis_ID
  var leave_date = req.body.leave_date;
  var to_date = req.body.to_date;
  var category = req.body.category
  var cause = req.body.cause

  var sql = `INSERT INTO record_leave (leave_id,Regis_ID,submis_date,leave_date,to_date,category,cause,leave_status)`
  +`VALUES (NULL, '${Regis_ID}', NOW(),'${leave_date}','${to_date}','${category}','${cause}', 'รออนุมัติ')`
  connection.query(sql,function (err, data) {
    if (err) throw err;
         console.log("record inserted");
     });
  Linenotify(messageG = 'นาย '+name+' '+surname +'\nได้ทำการ '+category+'\nวันที่ '+leave_date+' ถึง '+to_date+'\nเนื่องในสาเหตุ: '+cause) 

  res.send(
    '<html>'   
      +'<script>'
      +'alert("บันทึกสำเร็จ");'
      +'location.replace("/menu")'  
     +'</script>'
  +'</html>')

})

router.get('/list-history', isLoggedIn,function(req, res, next) {
  var sql='SELECT * FROM `record_view` where Regis_ID = ? ORDER BY leave_id DESC';
  connection.query(sql,req.user.Regis_ID,function (err, data, fields) {
  if(req.user.permission == 'Admin'){
    res.render('list-history-admin', {userData: data});
  }
  else{
    res.render('list-history', {userData: data});
  }
});
});

router.get('/viewhistory',isLoggedIn,function(req, res, next){

  connection.query('SELECT * FROM `record_view` where Regis_ID = ? and leave_id = ?',[req.user.Regis_ID,req.query.leave_id],function(err, result, fields, on_leave, sick_leave, Absent, Maternity_leave, Vacation){
    Object.keys(result).forEach(function(key) {
      var row = result[key];
      var Regis_ID = row.Regis_ID
      var name = row.name
      var surname = row.surname
      var personnel_id = row.personnel_id
      var department = row.department
      var position = row.position
      var email = row.email
      var tel_number = row.tel_number
      var line_id = row.line_id
      var cause = row.cause
      var category = row.category
      var leave_date = row.leave_date
      var to_date = row.to_date
      var leave_idto = row.leave_id

      var sql='SELECT sum(TIMESTAMPDIFF(day,`leave_date`,`to_date`)) as on_leave FROM record_view WHERE category = "ลากิจ" and leave_status ="ผ่านการอนุมัติ" and Regis_ID = ?';
      connection.query(sql,Regis_ID, function (err, result, fields) {
        Object.keys(result).forEach(function(key) {
          var row = result[key];
          if(row.on_leave == null){
           return on_leave = 0
          }
          else{
           return on_leave = row.on_leave
          }
        })
     }) 
     var sql='SELECT sum(TIMESTAMPDIFF(day,`leave_date`,`to_date`)) as sick_leave FROM record_view WHERE category = "ลาป่วย" and leave_status ="ผ่านการอนุมัติ" and Regis_ID = ?';
     connection.query(sql,Regis_ID, function (err, result, fields) {
       Object.keys(result).forEach(function(key) {
         var row = result[key];
          if(row.sick_leave == null){
           return sick_leave = 0
          }
          else{
           return sick_leave = row.sick_leave
          }
       })
    }) 
    var sql='SELECT sum(TIMESTAMPDIFF(day,`leave_date`,`to_date`)) as Absent FROM record_view WHERE category = "ขาดงาน" and leave_status ="ผ่านการอนุมัติ" and Regis_ID = ?';
    connection.query(sql,Regis_ID, function (err, result, fields) {
      Object.keys(result).forEach(function(key) {
        var row = result[key];
        if(row.Absent == null){
          return Absent = 0
         }
         else{
          return Absent = row.Absent
         }
      })
   }) 
   var sql='SELECT sum(TIMESTAMPDIFF(day,`leave_date`,`to_date`)) as Maternity_leave FROM record_view WHERE category = "ลาคลอด" and leave_status ="ผ่านการอนุมัติ" and Regis_ID = ?';
   connection.query(sql,Regis_ID, function (err, result, fields) {
     Object.keys(result).forEach(function(key) {
       var row = result[key];
       if(row.Maternity_leave == null){
        return Maternity_leave = 0
       }
       else{
        return Maternity_leave = row.Maternity_leave
       }
     })
  }) 
  var sql='SELECT sum(TIMESTAMPDIFF(day,`leave_date`,`to_date`)) as Vacation FROM record_view WHERE category = "ลาพักร้อน" and leave_status ="ผ่านการอนุมัติ" and Regis_ID = ?';
  connection.query(sql,Regis_ID, function (err, result, fields) {
    Object.keys(result).forEach(function(key) {
      var row = result[key];
      if(row.Vacation == null){
       return Vacation = 0
      }
      else{
       return Vacation = row.Vacation
      }
    })
 })
    var sql='SELECT * FROM `record_view` where Regis_ID = ? and leave_id = ?';
    connection.query(sql,[req.user.Regis_ID, req.query.leave_id], function (err, data, fields) {
      if(req.user.permission == 'Admin'){
        res.render('viewhistory-admin',{userData: data, name: name, on_leave: on_leave, sick_leave: sick_leave, Absent: Absent, Maternity_leave: Maternity_leave, surname: surname 
          , personnel_id: personnel_id, department: department, position: position, email: email, tel_number: tel_number, line_id: line_id, cause: cause, category: category
          , leave_date: leave_date, to_date: to_date , leave_idto: leave_idto ,Vacation: Vacation});
      }
      else{
        res.render('viewhistory',{userData: data, name: name, on_leave: on_leave, sick_leave: sick_leave, Absent: Absent, Maternity_leave: Maternity_leave, surname: surname 
          , personnel_id: personnel_id, department: department, position: position, email: email, tel_number: tel_number, line_id: line_id, cause: cause, category: category
          , leave_date: leave_date, to_date: to_date , leave_idto: leave_idto ,Vacation: Vacation});
      }
    })
  })

})
})

router.get('/changepass',isLoggedIn,function(req,res,next){
  res.render('changepass',{user:req.user, message: req.flash('CheckPassword')})
})

router.post('/changepassword',function(req,res,next){
  var username = req.user.username
  var Current_password = req.body.Current_password
  var password = req.body.password
  var conpassword = req.body.Con_password
  var sql = `select * from register where username = '${username}'`
  connection.query(sql,function(err,rows){
    if(bcrypt.compareSync(Current_password, rows[0].password)){
      if(password == conpassword){ 
        password = bcrypt.hashSync(password, null, null)
        var sql = `UPDATE register SET password = '${password}' WHERE username = '${username}'`
        connection.query(sql,function(err,rows){
          res.send(
            '<html>'   
              +'<script>'
              +'alert("เปลี่ยนรหัสสำเร็จ");'
              +'location.replace("/logout")'  
             +'</script>'
          +'</html>')
        }) 
      }
      else{
        req.flash('CheckPassword','รหัสผ่านไหม่ไม่ตรงกัน')
        res.redirect('/user/changepass') 
      }
    }
    else{
      req.flash('CheckPassword','รหัสผ่านปัจจุบันไม่ถูกต้อง')
      res.redirect('/user/changepass') 
    }
    
  }) 
})

function isLoggedIn(req, res, next){
  if(req.isAuthenticated())
   return next();
 
  res.redirect('/');
 }


module.exports = router;



