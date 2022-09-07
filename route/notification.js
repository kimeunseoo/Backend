/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * HTTP Interaction
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const acc = require("../dbac.js");
//const geo = require("../geo.js");

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Inhalt liefern
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

exports.get = function ( part, uid, req, res, next )
{
    let table = "";
    // *** //
    switch( part )
    {
        case 'value': table = "tbl_reminder"; break;
        case 'state': table = "tbl_notification"; break;
        default:      table = "tbl_reminder"; break;
    }
    // *** //
	acc.get(
        `SELECT * FROM ${table} WHERE uid = '${uid}' ORDER BY id`,
        ( json ) => {
            console.log(json);
            res.send(json);
        }
    );
}

exports.getList = function ( uid, req, res, next )
{
	acc.get(
        `SELECT * FROM tbl_reminder WHERE uid = '${uid}' ORDER BY id`,
        ( json ) => {
            console.log(json);
            res.send(json);
        }
    );
}

exports.set = function ( uid, ontype, onday, onweek, onregion, ontitle, onmessage, req, res, next )
{
	acc.set(
        `INSERT INTO tbl_reminder ` +
        `( uid, otype, ondate, onweekday, onlocation, mtitle, mtext )` +
        ` VALUES ` +
        `( '${uid}', '${ontype}', '${onday}', '${onweek}', '${onregion}', '${ontitle}', '${onmessage}' )`
    );
}

exports.getNotify = function ( uid, req, res, next )
{
	acc.get(
        `SELECT * FROM tbl_notification WHERE uid = '${uid}' ORDER BY id`,
        ( json ) => {
            console.log(json);
            res.send(json);
        }
    );
}

exports.setNotify = function ( uid, onevent, onmessage, onlocation, req, res, next )
{
	acc.set( `DELETE FROM tbl_notification WHERE uid = '${uid}'` );
	acc.set(
        `INSERT INTO tbl_notification ( uid, onevent, onmessage, onlocation ) VALUES ` +
        `( '${uid}', '${onevent}', '${onmessage}', '${onlocation}' )`
    );
}

exports.remove = function ( id, req, res, next )
{
    res.send(`DELETE FROM tbl_reminder WHERE id = '${id}'`);
	acc.set( `DELETE FROM tbl_reminder WHERE id = '${id}'` );
}
