/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * HTTP Interaction
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const acc = require("../dbac.js");
//const geo = require("../geo.js");


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Inhalt liefern
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

exports.new = function ( uid, body, imagename, req, res )
{
    const query = `INSERT INTO tbl_events ` +
    `( uid, category, description, longitude, latitude, addressinfo, ondate, foto1, location ) ` +
    `VALUES ` +
    `( '${uid}', '${body.category}', '${body.description}', '${body.longitude}', '${body.latitude}', '${body.location}', '${body.date}', '${imagename}', '${body.title}' )`;

    // res.send(query);

	acc.set( query );

    res.writeHead(301, {
        Location: "https://on-point-project.netlify.app/"
      }).end();
}

exports.get = function ( uid, req, res )
{
    const query = `SELECT * FROM tbl_events WHERE uid = '${uid}' ORDER BY id`;
    // *** //
	acc.get( query, function(json) {
        res.send(json);
    });
}


exports.getJoinedEvents = function ( uid, req, res )
{
    const query = `SELECT * FROM tbl_events INNER JOIN tbl_event_history ` +
                  `ON tbl_events.id = tbl_event_history.eid WHERE ` +
                  `tbl_event_history.uid = '${uid}' ORDER BY tbl_events.id`;
    // *** //
	acc.get( query, function(json) {
        res.send(json);
    });
}

exports.getJoinedFriends = function ( eid, req, res )
{
    const query = `SELECT * FROM tbl_users INNER JOIN tbl_event_history ` +
                  `ON tbl_users.id = tbl_event_history.uid WHERE ` +
                  `tbl_event_history.eid = '${eid}' ORDER BY tbl_users.id`;
    // *** //
	acc.get( query, function(json) {
        res.send(json);
    });
}

exports.getEventAvatar = function ( eid, req, res )
{
    const query = `SELECT * FROM tbl_users INNER JOIN tbl_events ` +
                  `ON tbl_users.id = tbl_events.uid WHERE ` +
                  `tbl_events.id = '${eid}' ` +
                  `ORDER BY tbl_users.id LIMIT 1`;
    // *** //
	acc.get( query, function(json) {
        res.send(json);
    });
}


exports.refer = function (req, res){
    
    res.writeHead(301, {
        Location: "https://on-point-project.netlify.app"
      }).end();
}