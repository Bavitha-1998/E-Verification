const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
var crypto = require('crypto');

const EmployeeSchema = mongoose.Schema ({
    fname: {
      type: String,
      required: true
    },
    lname: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    company: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      required: true
    },
    technical: {
      type: String,
      required: true
    },
    communicational: {
      type: String,
      required: true
    },
    behaviour: {
      type: String,
      required: true
    },
    projectcount: {
      type: String,
      required: true
    },
    hashvalue:{
      type: String,
      required: true
    },
    prevhash:{
      type: String,
      required: true
    },
    index:{
      type : Number,
      required : true
    }
  });


  const Employee = module.exports = mongoose.model('Employee', EmployeeSchema);
  
  module.exports.addEmployee = function(newEmployee, callback) {

        Employee.find({}).count(function (err, res) {
          if (err)
            throw err;
          else{
            if(res>0){
              Employee.find({'index':res},function (err, response) {
                if (err)
                  throw err;
                else{
                  newEmployee.prevhash = response[0].hashvalue;
                  newEmployee.index =  res+1;
                      const Contenttobe_hashed=newEmployee.fname+ newEmployee.prevhash+newEmployee.lname+newEmployee.email+newEmployee.phone+newEmployee.company+newEmployee.gender+newEmployee.technical+newEmployee.behaviour+newEmployee.communicational;
                      var hash = crypto.createHash('sha256').update(Contenttobe_hashed).digest('hex');
                       newEmployee.hashvalue = hash;
                  newEmployee.save(callback);
                }
              });
            }
            else{
              newEmployee.prevhash = 0;
              newEmployee.index =  res+1;
                  const Contenttobe_hashed=newEmployee.fname+ newEmployee.prevhash+newEmployee.lname+newEmployee.email+newEmployee.phone+newEmployee.company+newEmployee.gender+newEmployee.technical+newEmployee.behaviour+newEmployee.communicational;
                  var hash = crypto.createHash('sha256').update(Contenttobe_hashed).digest('hex');
                  newEmployee.hashvalue = hash;
              newEmployee.save(callback);
            }
          }
      });
    };

  