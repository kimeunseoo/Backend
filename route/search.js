/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * HTTP Interaction
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const acc = require("../dbac.js");
//const geo = require("../geo.js");

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Inhalt liefern
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

exports.get = function ( keyword, mylat, mylong, distanceinfo, category, spdate, req, res )
{
    function calcdist ( lat1, lng1, lat2, lng2 )
    {
      let radlat1 = 0.0; let radlat2 = 0.0;
      let theta = 0.0; let radtheta = 0.0;
      let dist = 0.0; let pi = Math.PI //1.6 ; 3.13
      radlat1 = pi * lat1 / 180;
      radlat2 = pi * lat2 / 180;
      theta = lng1 - lng2;
      radtheta = pi * theta / 180;
      dist = Math.sin(radlat1) * Math.sin(radlat2) + 
             Math.cos(radlat1) * Math.cos(radlat2) * 
             Math.cos(radtheta);
      dist = Math.acos(dist);
      dist = dist * 180 / pi;
      dist = dist * 60 * 1.1515;
      dist = dist * 1.609344;
      return dist;
    }

    let   query  = `SELECT * FROM tbl_events WHERE `;
          query += `( `;
          query += `addressinfo LIKE '%${keyword}' OR `;   // Addressinformation
          query += `addressinfo LIKE '%${keyword}%' OR `;
          query += `addressinfo LIKE '${keyword}%' OR `;
          query += `location LIKE '%${keyword}' OR `;      // Titelfeld
          query += `location LIKE '%${keyword}%' OR `;
          query += `location LIKE '${keyword}%' OR `;
          query += `description LIKE '%${keyword}' OR `;   // Beschreibung
          query += `description LIKE '%${keyword}%' OR `;
          query += `description LIKE '${keyword}%' `;
          query += `)`;
          // *** //
          let distance = 0;
          // *** //
          if      ( distanceinfo === '<No>' ) distance =   0;
          else if ( distanceinfo === '+1km' ) distance =   1;
          else if ( distanceinfo === '+2km' ) distance =   2;
          else if ( distanceinfo === '+3km' ) distance =   3;
          else if ( distanceinfo === '+4km' ) distance =   4;
          else if ( distanceinfo === '+5km' ) distance =   5;
          else if ( distanceinfo === '+6km' ) distance =   6;
          else if ( distanceinfo === '+7km' ) distance =   7;
          else if ( distanceinfo === '+8km' ) distance =   8;
          else if ( distanceinfo === '+9km' ) distance =   9;
          else if ( distanceinfo ==='+10km' ) distance =  10;
          else if ( distanceinfo ==='+20km' ) distance =  20;
          else if ( distanceinfo ==='+30km' ) distance =  30;
          else if ( distanceinfo ==='+40km' ) distance =  40;
          else if ( distanceinfo ==='+50km' ) distance =  50;
          else if ( distanceinfo ==='+80km' ) distance =  80;
          else if ( distanceinfo ==='+100km') distance = 100;
          else if ( distanceinfo ==='+200km') distance = 200;
          // *** //
          //if ( distance > 0 )
          //  query += ` AND (` + function (distance) {
            /*The approximate conversions are:
            Latitude: 1 deg = 110.574 km
            Longitude: 1 deg = 111.320*cos(latitude) km*/
          //  let lat = distance / 110574;
          //  let log = 111320 * Math.cos(lat);
            // *** //
          //  return `latitude >= '${mylat}' AND latitude <= '${mylat + lat}' AND ` +
          //         `longitude >= '${mylong}' AND longitude <= '${mylong + log}' `;
          //} + `) `;
          // *** //
          if ( category != null && category > 0 )
            query += `AND category = '${category - 1}' `;
          // *** //
          if ( spdate != null && spdate != 0 )
            query += `AND ondate = '${spdate}' `;
          // *** //
          query += `ORDER BY ondate `;
          query += `DESC`;

          console.log(query);

	  acc.get( query, function(json) {
      console.log(json);
      // *** //
      if ( distance <= 0)
        res.send(json);
      else if ( distance > 0)
      {
        let ret = [];
        let jso = null;
        // *** //
        jso = JSON.parse(json);
        // *** //
        for ( let element of jso )
        {
          let d = calcdist( mylat, mylong, element.latitude, element.longitude );
          // *** //
          if ( d <= distance )
            ret.push( element );
        }
        // *** //
        res.send(ret);
      }
    });

}

exports.detail = function ( eid, req, res )
{

  const query = `SELECT * FROM tbl_events WHERE id = '${eid}'`;

  console.log(query);

  acc.get( query, function(json) {
    console.log(json);
    res.send(json);
  });

}

exports.join = function ( eid, uid, text, info, req, res )
{

  const query = `INSERT INTO tbl_event_history ` +
                `( eid, uid, label, description ) ` +
                `VALUES ` +
                `( '${eid}', '${uid}', '${text}', '${info}' )`;

  console.log(query);

  acc.get( query, function(json) {
    console.log(json);
    res.send(json);
  });

}

exports.disjoin = function ( eid, uid, req, res )
{

  const query = `DELETE FROM tbl_event_history WHERE eid = '${eid}' AND uid = '${uid}' `;

  console.log(query);

  acc.get( query, function(json) {
    console.log(json);
    res.send(json);
  });

}

exports.delete = function ( eid, req, res )
{

  const query = `DELETE FROM tbl_events WHERE id = '${eid}' `;

  acc.set( query );

  console.log(query);

  res.send(query);

}

exports.getCategory = function ( cid, req, res )
{

  const query = `SELECT * FROM tbl_events WHERE category = '${cid}' ORDER BY id`;

  console.log(query);

  acc.get( query, function(json) {
    console.log(json);
    res.send(json);
  });

}
