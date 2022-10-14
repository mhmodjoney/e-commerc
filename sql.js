var express = require('express');
var app = express();
var sql = require("mssql");
app.use(express.json());
var config = {  
    server: 'DESKTOP-MVB8N7J',  //update me
    authentication: {
        type: 'default',
        options: {
          // trustedConnection: true,
            userName: 'mj2', //update me
            password: '12345678'  //update me
        }
    },
    options: {
        // If you are on Microsoft Azure, you need encryption:
         encrypt: false,
        database: 'Brightness'  //update me
    }
}; 
var config_online = {  
    server: 'sql8001.site4now.net',  //update me
    authentication: {
        type: 'default',
        options: {
          // trustedConnection: true,
            userName: 'db_a8e42a_brightness_admin', //update me
            password: 'b12345678'  //update me
        }
    },
    options: {
        // If you are on Microsoft Azure, you need encryption:
         encrypt: false,
        database: 'db_a8e42a_brightness'  //update me
    }
}; 

var dict = {
    number: sql.Int,
    string: sql.VarChar(300),
     };


app.get('/',  function  (req, res) {
   const query="SELECT * FROM [Brightness].[dbo].[area];"
   // getEmployees(res,query)
    // connect to your database
    sp_area(res, "select" , 1, "name" , "state", 2)

});

app.post('/', async function  (req, res) {

  //  sp_area(res, req.body.level ,req.body.id,req.body.name , req.body.state,req.body.fk_city)
  sp_area2(res ,req)
 });


// var server = app.listen(5000, function () {
//     console.log('Server sql is running..');
// });

///////////////***** */


function getEmployees(res,query) {
    var dbConn = new sql.connect(config);
    dbConn.then(function () {
        var request = new sql.Request();
        request.query(query).then(function (resp) {
            console.log(resp);
            res.send(resp.recordset)
        }).catch(function (err) {
            console.log(err);
          
        });
    }).catch(function (err) {
        console.log(err);
    });}
/////////////////////////////////

var sp_area2 = function(res , req) {
    var conn = new sql.connect(config_online);
    conn.then(function(conn) {
      var request =  new sql.Request(conn);
     
      
      for (const [key, value] of Object.entries(req.body)) {
        console.log(key, typeof(value) );
        request.input(key, dict[typeof(value)], value);
      }
      
      request.execute('sp_area').then(function(resp) {
   

        res.send(resp.recordset)
      }).catch(function(err) {
        console.log(err);
      });
    });
  }

var sp_area = function(res , level , id, name , state, fk_city) {
    var conn = new sql.connect(config_online);
    conn.then(function(conn) {
      var request = new sql.Request(conn);
      request.input('level', sql.VarChar(220), level);
      request.input('id', sql.Int, id);
      request.input('name',  sql.VarChar(220), name);
      request.input('state',  sql.VarChar(220), state);
      request.input('fk_city', sql.Int, fk_city);
      request.execute('sp_area').then(function(resp) {
   

        res.send(resp.recordset)
      }).catch(function(err) {
        console.log(err);
      });
    });
  }
////////////////////2


const getdata =  async ( res ) => {
    var json ={}
    sql.connect(config, function (err) {
    
        if (err) console.log(err);
    
        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('SELECT * FROM [Brightness].[dbo].[city]', function (err, recordset) {
            
            if (err) console.log(err)
    
            // send records as a response
            json=recordset
            console.log(json)
           
           
            
        });
      
    });
    console.log("+++",json)
    return   json
    
  };

  module.exports = app;
