const { response, json } = require("express");
const pool = require('../database');
const randtoken = require('rand-token');
const envio = require('../helpers/enviarEmail');
const bcrypt = require("bcryptjs");



const reset = async (req, res, next) => {

    const  {email} = req.body.email;
    await pool.query('SELECT * FROM tblusuario WHERE strEmail=?', email, function (err,result){
        if (err) throw err;

        if(result[0].email.lenght > 0){
            var token = randtoken.generate(20);
            var sent = envio.sendEmail(email,token);
            if (sent != '0') {
                var data = {
                    token: token
                }
                pool.query('UPDATE tblusuario SET ? WHERE strEmail ="' + email + '"', data, function(err, result) {
                    if(err) throw err
         
                })
                return res.status(200).json({
                    ok: true,
                    msg:'The reset password link has been sent to your email address'
                })
               
 
            } else {
                return res.status(400).json({
                    ok : false,
                    msg : 'Something goes to wrong. Please try again'
                })
            }
        } else {
            console.log('2');
            return res.status(400).json({
                type: 'error',
                msg: 'The Email is not registered with us'
            })
        }
    });   
}

const update = async (req, res, next) => {
    const {token, password} = req.body;
    pool.query('SELECT * FROM users WHERE token ="' + token + '"', function(err, result) {
        if (err) throw err;
 
        var type;
        var msg;
 
        if (result.length > 0) {
                
              var saltRounds = 10;
 
             // var hash = bcrypt.hash(password, saltRounds);
 
            bcrypt.genSalt(saltRounds, function(err, salt) {
                  bcrypt.hash(password, salt, function(err, hash) {
 
                   var data = {
                        password: hash
                    }
 
                    pool.query('UPDATE users SET ? WHERE email ="' + result[0].email + '"', data, function(err, result) {
                        if(err) throw err
                    });
                  });
              });
              
            res.status(200).json({
                ok :true,
                msg : 'Your password has been updated successfully'
            })  
              
        } else {
            res.status(400).json({
                ok: false,
                msg:'Invalid link; please try again'
            })

        }
 
    });
}

module.exports={    
    reset, 
    update
}
