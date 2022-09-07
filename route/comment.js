/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * HTTP Interaction
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const acc = require("../dbac.js");
//const geo = require("../geo.js");

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Inhalt liefern
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

exports.get = function ( eid, req, res, next )
{
	acc.get(
        `SELECT * FROM tbl_comments WHERE eid = '${eid}' ORDER BY id DESC`,
        ( json ) => {
            res.send(json);
        }
    );
}

exports.set = function ( uid, eid, ondate, comment, req, res, next )
{
	acc.get(
        `SELECT * FROM tbl_users WHERE id = '${uid}' ORDER BY id DESC`,
        ( data ) => {
            let json = JSON.parse(data);

            const query = `INSERT INTO tbl_comments ` +
            `( uid, eid, ondate, commenttext, author )` +
            ` VALUES ` +
            `( '${uid}', '${eid}', '${ondate}', '${comment}', '${json[0].fname} ${json[0].sname}' )`;

            acc.set( query );

            console.log( query );

            res.send( query );      
        }
    );

}
