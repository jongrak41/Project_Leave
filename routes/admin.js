var express = require('express');
var router = express.Router(); 
var requestG = require('request');
var bcrypt = require('bcrypt-nodejs');
var mysql = require('mysql');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);

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

router.get('/register', isLoggedIn,function(req, res, next) {
    res.render('register');
  });

router.post('/insert', function(req, res, next){
    var fname = req.body.fname;
    var lname = req.body.lname;
    var fname_en = req.body.fname_en;
    var lanem_en = req.body.lname_en;
    var personnel_id = req.body.personnel_id;
    var email = req.body.email;
    var line_id = req.body.line_id;
    var tel = req.body.tel;
    var position = req.body.position;
    var department = req.body.department;
    var username = req.body.username;
    var password = req.body.password;
    var permission = req.body.permission;

    password = bcrypt.hashSync(password, null, null)
    var sql = `INSERT INTO register (Regis_ID, personnel_id, name, surname, name_eng, surname_eng, position, department, email, line_id, tel_number, username, password, permission, date_register, reg_status)`
    +`VALUES (NULL, '${personnel_id}', '${fname}', '${lname}', '${fname_en}', '${lanem_en}', '${position}', '${department}', '${email}', '${line_id}', '${tel}', '${username}', '${password}', '${permission}', NOW(), 'enable')`;
    connection.query(sql,function (err, data) {
       if (err) throw err;
            console.log("record inserted");
        });
    Linenotify(messageG ="นาย :"+fname+" "+lname+" รหัส "+personnel_id+" ได้ทำการลงทะเบียนเข้าสู่ระบบ")
    res.send(
      '<html>'   
        +'<script>'
        +'alert("บันทึกสำเร็จ");'
        +'location.replace("/admin/register")'  
       +'</script>'
    +'</html>')
  })


router.get('/btn-user-list',isLoggedIn,function(req, res, next) {
    var sql='SELECT * FROM register where reg_status = "enable"';
    connection.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('btn-user-list', { title: 'User List', userData: data});
});
});

router.get('/viewemp',isLoggedIn,function(req, res, next){
  var sql='SELECT * FROM register where reg_status = "enable" and Regis_ID = ?';
  connection.query(sql,req.query.Regis_ID, function (err, data, fields) {
  res.render('viewemp',{userData: data});
})
})

router.get('/disable',function(req, res, next){
  var sql='UPDATE `register` SET `reg_status` = "disable" WHERE `register`.`Regis_ID` = ?'; 
  connection.query(sql,req.query.Regis_ID, function (err, data, fields) {
  if (err) throw err;
  res.redirect('/admin/btn-user-list');
})
  connection.query('SELECT * FROM register where Regis_ID = ?',req.query.Regis_ID,function(err, result, fields){
    Object.keys(result).forEach(function(key) {
      var row = result[key];
      var name = row.name
      var surname = row.surname
      Linenotify(messageG ="ได้ทำการยกเลิก : "+name+" "+surname+" จากการเป็นพนักงาน")
  })
})
})

router.get('/list-leave', isLoggedIn,function(req, res, next) {
  var sql='SELECT * FROM `record_view` where leave_status = "รออนุมัติ"';
  connection.query(sql, function (err, data, fields) {
  if (err) throw err;
  res.render('list-leave', {userData: data});
});
});


router.get('/viewleave',isLoggedIn,function(req, res, next){

  connection.query('SELECT * FROM `record_view` where leave_status = "รออนุมัติ" and leave_id = ?',req.query.leave_id,function(err, result, fields, on_leave, sick_leave, Absent ,Maternity_leave ,Vacation){
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
    var sql='SELECT * FROM `record_view` where leave_status = "รออนุมัติ" and leave_id = ?';
    connection.query(sql,req.query.leave_id, function (err, data, fields) {
      res.render('viewleave',{userData: data, name: name, on_leave: on_leave, sick_leave: sick_leave, Absent: Absent, Maternity_leave: Maternity_leave, surname: surname 
      , personnel_id: personnel_id, department: department, position: position, email: email, tel_number: tel_number, line_id: line_id, cause: cause, category: category
      , leave_date: leave_date, to_date: to_date , leave_idto: leave_idto, Vacation: Vacation});
    })
  })

})
})

router.get('/approve',function(req, res, next){
  var sql='UPDATE `record_leave` SET `leave_status` = "ผ่านการอนุมัติ" WHERE `record_leave`.`leave_id` = ?;'; 
  connection.query(sql,req.query.leave_id, function (err, data, fields) {
  if (err) throw err;
})

  var leave_id = req.query.leave_id
  var Regis_ID = req.user.Regis_ID
  var sql = `INSERT INTO record_approve (Approve_id, Submis_date, Regis_ID, leave_id) VALUES (NULL, NOW(), ${Regis_ID}, ${leave_id})`;
  connection.query(sql,function (err, data) {
     if (err) throw err;
          console.log("record inserted");
      });

        res.send(
        '<html>'   
          +'<script>'
          +'alert("อนุมัติสำเร็จ");'
          +'location.replace("/admin/list-leave")'  
         +'</script>'
      +'</html>')
      Linenotify(messageG =`รายการลา เลขที่ ${req.query.leave_id} ได้ทำการอนุมัติเรียบร้อย`)
})

router.get('/non_approve',function(req, res, next){
  var sql='UPDATE `record_leave` SET `leave_status` = "ไม่อนุมัติ" WHERE `record_leave`.`leave_id` = ?;'; 
  connection.query(sql,req.query.leave_id, function (err, data, fields) {
  if (err) throw err;
})

var leave_id = req.query.leave_id
var Regis_ID = req.user.Regis_ID
var sql = `INSERT INTO record_approve (Approve_id, Submis_date, Regis_ID, leave_id) VALUES (NULL, NOW(), ${Regis_ID}, ${leave_id})`;
connection.query(sql,function (err, data) {
   if (err) throw err;
        console.log("record inserted");
    });

      res.send(
      '<html>'   
        +'<script>'
        +'alert("ไม่ทำการอนุมัติสำเร็จ");'
        +'location.replace("/admin/list-leave")'  
       +'</script>'
    +'</html>')
    Linenotify(messageG =`ไม่ทำการอนุมัติรายการลา เลขที่ ${req.query.leave_id} กรุณาติดต่อหัวหน้าฝ่าย`)
})
 



function isLoggedIn(req, res, next){
  if(req.isAuthenticated())
   return next();
 
  res.redirect('/');
 }


  module.exports = router;  