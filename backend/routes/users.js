const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const Employee = require('../models/employee');
var crypto = require('crypto');

// Register
router.post('/register', (req, res, next) => {
  res.setHeader('Content-Type', 'text/html');
  let newUser = new User ({
    //_id:req.body.username,
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    company: req.body.company,
    phone: req.body.phone,
    password: req.body.password
  });

  var quary= {email:newUser.email}; // To check email existence
  User.findOne(quary,function(err,posts){
        if(err){
          return res.json({"error":err});
        }
        else{
          if(!posts){
            User.addUser(newUser, (err, user) => {
              if(err) {
                console.log({success: false, msg: 'Failed to register user'});
                res.json({success: false, msg: 'Failed to register user'});
              } else {
                console.log({success: true, msg: 'registered in User Collection'});
                res.json({success: true, msg: 'registered in User Collection'});
              }
            });
          }
          else{
            console.log({success: false, msg: 'Email Already existed'});
            res.json({success: false, msg: 'Email Already existed'});
          }
        }
    });
});

router.get('/searchemployee/:phone',function(req,res)
{
    var quary = {phone:req.params.phone};
    Employee.find(quary,function(err,employee){
        if(err){
            return res.json({"error":err});}
        else{
          console.log(employee);
          return res.json(employee);
        }
    });
});

router.get('/validatechain',function(req,res)
{
    Employee.find({},function(err,employee){
        if(err){
            return res.json({success: false, "error":err});}
        else{
          var validchain;
          var corructplace;
          if(employee.length>0){
            for(var i=0;i<employee.length;i++){
              const Contenttobe_hashed=employee[i].fname+employee[i].prevhash+employee[i].lname+employee[i].email+employee[i].phone+employee[i].company+employee[i].gender+employee[i].technical+employee[i].behaviour+employee[i].communicational;
              var hash = crypto.createHash('sha256').update(Contenttobe_hashed).digest('hex');
              if(i == employee.length-1){
                if(employee[i].hashvalue == hash){
                  validchain = true;  
                }
                else{
                  validchain = false;
                  corructplace = i+1;  
                }
              }
              else{
                if(employee[i+1].prevhash == hash && employee[i].hashvalue == hash ){
                  validchain = true;
                }
                else{
                  validchain = false;
                  corructplace = i+1;
                  break;
                }
              }
            }
            if(validchain == true){
              return res.send({success: true, msg:'Chain is valid.'});
            }
            else{
              return res.send({success: false, msg:'Chain is corrupted at index ' + corructplace});  
            }
          }
          else{
            return res.send({success: false, msg:'No records found'});
          }
        }
    });
})


router.post('/addemployee', (req, res, next) => {
  res.setHeader('Content-Type', 'text/html');
  let newEmployee = new Employee ({
    //_id:req.body.username,
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    company: req.body.company,
    phone: req.body.phone,
    gender: req.body.gender,
    projectcount: req.body.projectcount,
    technical: req.body.technical,
    communicational: req.body.communicational,
    behaviour: req.body.behaviour
  });


 // console.log('fghfdgggfdfghgfghfg',newEmployee);
  Employee.addEmployee(newEmployee, (err, user) => {
    if(err) {
      console.log({success: false, msg: 'Failed to register user'});
      res.json({success: false, msg: 'Failed to register user'});
      //res.json({success: false, msg: 'Failed to register user'});
    } else {
        //Add to Dummy Collection
            console.log({success: true, msg: 'registered in Employee Collection'});
            res.json({success: true, msg: 'registered in Employee Collection'});
      }
  });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user) {
      return res.json({success: false, msg: 'User not found'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch) {
        const token = jwt.sign(user.toObject(), config.secret, {
          expiresIn: 604800 // 1 week
        });
        res.json({
          success: true,
          token: 'Bearer '+token,
          user: 
          {
            id: user._id,
            name: user.name,
            username: user.username,
            company: user.company,
            phone: user.phone,
            email: user.email
          }
        })
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});
// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({user: req.user});
});

module.exports = router;
