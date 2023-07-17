const mysql = require('mysql');

let connection = mysql.createConnection({

    // host: '192.168.15.176',
    // user: 'taxusr',
    // password: 'taxpass',
    // database: 'nac_biting' ,
    // insecureAuth :true

    
    host: 'nac-bidding.cgdst30jpehd.ap-south-1.rds.amazonaws.com',
    user: 'admin',
    password: 'nacsia2023',
    database: 'nac-bidding' ,
    insecureAuth :true
});


connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

  });

  module.exports = connection;


  