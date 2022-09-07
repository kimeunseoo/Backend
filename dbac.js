const datenbank = require('sqlite3');
const db = new datenbank.Database('./app.db');

// Je nach Anfrage werden Daten vom MySQL-Datenbank abgerufen
exports.get = function ( query, cbk )
{
    db.all(query, (fehler, zeilen) => {
		console.log(query);
		console.log(JSON.stringify(zeilen));
        cbk(JSON.stringify(zeilen));
    });
}

// Es wird eine Schreiboperation im Datenbank ausgeführt
exports.set = function ( query )
{
    db.all(query, (fehler, zeilen) => {
		console.log(query);
		console.log(JSON.stringify(zeilen));
    });
}
