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
