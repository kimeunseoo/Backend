/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * HTTP Interaction
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const acc = require("../dbac.js");

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Inhalt liefern
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

exports.get = function ( id, req, res, next ) {
    //res.send("setup page has been loaded");
    acc.get(
        `SELECT * FROM tbl_users WHERE id = '${id}' ORDER BY id`,
        (json) => {
            console.log(json);
            res.send(json);
        }
    );
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Nimmt allgemeine Einstellungen entgegen und leitet sie weiter
 * an die Datenbank
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

exports.setGeneral = function (uid, style, langkey, shcom, evno, meno, lono, req, res) {
    let statement = `INSERT INTO tbl_settings ` +
        `( uid, style, langkey, showcomments, ` +
        `  eventnotification, messagenotification, locationnotification ) ` +
        ` VALUES ` +
        `( '${uid}', '${style}', '${langkey}', '${shcom}', ` +
        ` '${evno}', '${meno}', '${lono}' )`
    // *** //
    console.log(statement);
    acc.set(`DELETE FROM tbl_settings WHERE uid == '${uid}'`);
    acc.set( statement );
    res.send("General settings updated successfully... :-)");
}

exports.getGeneral = function ( uid, req, res, next ) {
    acc.get(
        `SELECT * FROM tbl_settings WHERE uid = '${uid}' ORDER BY id`,
        (json) => {
            console.log(json);
            res.send(json);
        }
    );
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Nimmt Benutzerdaten entgegen und leitet sie weiter
 * an die Datenbank
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

exports.setUser = function ( id, fname, lname, email, phone, city, pcode, statusinfo, icon, req, res, next )
{
	acc.set(
        `UPDATE tbl_users SET ` +
        `fname = '${fname}', ` +
        `sname = '${lname}', ` +
        `email = '${email}', ` +
        `phone = '${phone}', ` +
        `location = '${city}', ` +
        `pcode = '${pcode}', ` +
        `aboutme = '${statusinfo}', ` +
        `logo = 'http://localhost:3004/public/${icon}' ` +
        `WHERE id = '${id}'`
    );
}

exports.setLogo = function ( id, logo, req, res, next )
{
	acc.set(
        `UPDATE tbl_users SET ` +
        `logo = '${logo}' ` +
        `WHERE id = '${id}'`
    );
    res.send( { image: logo } );
}

