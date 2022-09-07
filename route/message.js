/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * HTTP Interaction
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const acc = require("../dbac.js");
//const geo = require("../geo.js");

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Inhalt liefern
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

exports.get = function ( req, res, next )
{
	acc.get(
        "SELECT * FROM tbl_users ORDER BY id",
        ( json ) => {
            console.log(json);
        }
    );
}

exports.getFriends = function ( id, req, res, next )
{
	acc.get(
        `SELECT * FROM tbl_friends WHERE uid = '${id}' ORDER BY name`,
        ( json ) => {
            console.log(json);
            res.send(json);
        }
    );
}

exports.getReminderOptions = function ( id, req, res, next )
{
	acc.get(
        `SELECT * FROM tbl_reminder WHERE uid = '${id}' ORDER BY mtext`,
        ( json ) => {
            console.log(json);
            res.send(json);
        }
    );
}

exports.getShare = function ( uid, fid, req, res, next )
{
	acc.get(
        `SELECT * FROM tbl_messages WHERE (origin_uid = '${uid}' AND related_uid = '${fid}') OR (origin_uid = '${fid}' AND related_uid = '${uid}') ORDER BY id`,
        ( json ) => {
            console.log(json);
            res.send(json);
        }
    );
}

exports.getSend = function ( uid, fid, msg, req, res, next )
{
    const dte = new Date().getTime();
    // *** //
	acc.set(
        `INSERT INTO tbl_messages ( origin_uid, related_uid, ondate, messagetext ) VALUES ` +
        `( '${uid}', '${fid}', '${dte}', '${msg}' )`
    );
}

exports.getNotifyFriend = function ( uid, fid, rid, req, res, next )
{
	acc.set(
        `INSERT INTO tbl_reminder_notification ( origin_uid, related_uid, rid ) VALUES ` +
        `( '${uid}', '${fid}', '${rid}' )`
    );
}

exports.connectFriend = function ( uid, find, req, res, next ) {
    acc.get(
        `SELECT * FROM tbl_users WHERE email = '${find}' ORDER BY id`,
        (json) => {
            let j = JSON.parse(json);
            acc.set( `INSERT INTO tbl_friends ( uid, fid, name ) VALUES ( '${uid}', '${j[0].id}', '${j[0].email}' )` );
            res.send(json);
        }
    );
}