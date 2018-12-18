var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "danny",
    password: "welldonebaku",
    database: "f1"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to MySQL server.");

    var sql = "SELECT * FROM 2018_stats";
    
    con.query(sql, function(err, result, fields) {
        if (err) throw err;
        console.log("Extracted " + result.length + " entries.");

        exports._2018_stats = result;
    });

    var sql = "SELECT * FROM 2018_driver_standings";
    
    con.query(sql, function(err, result, fields) {
        if (err) throw err;
        console.log("Extracted " + result.length + " entries.");

        exports._2018_driver_standings = result;

        con.end();
    });
});