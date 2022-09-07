/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * HTTP Interaction
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const acc = require("../dbac.js");
//const geo = require("../geo.js");

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Inhalt liefern
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

exports.get = function ( fname, lname, email, pass, phone, city, pcode, req, res, next )
{
	acc.set(
        `INSERT INTO tbl_users (` +
        `fname, sname, email, pword, phone, location, pcode ) VALUES ( ` +
        `'${fname}', '${lname}', '${email}', '${pass}', '${phone}', '${city}', '${pcode}' )`
    );
    res.send(`INSERT INTO tbl_users (` +
    `fname, sname, email, pword, phone, location, pcode ) VALUES ( ` +
    `'${fname}', '${lname}', '${email}', '${pass}', '${phone}', '${city}', '${pcode}' )`);
}
