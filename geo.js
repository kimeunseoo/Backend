/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Die Geolocation wird mittels zwei technischen Mitteln umgesetzt. Bei 
 * Möglichkeit wird kostenlose Developer-Account von ipgeolocation.io 
 * verwendet. Scheitert der Versuch aus irgendeinem Grund, wird der
 * Browser-interne Nagivator in Anspruch genommen.
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// Import von ipgeolocation.io
const IPGeolocationAPI = require('ip-geolocation-api-javascript-sdk');

// Verbindungsaufbau zum ipgeolocation.io
const externGeoAPI = new IPGeolocationAPI("7ad6c21793864559a771a52d7c58d8e5", false); 

// Diese Funktion liefert einen JSON mit Koordinaten vom aktuellen 
// Zugriffs-IP-Adresse, die den Aufruf veranlasst hat
exports.listen = function ( clbk )
{

	// Prüft, welche Variante benutzt wird
	let checkGeoMode = 0;

	// Versuchsaufbau mit ipgeolocation.io
	externGeoAPI.getGeolocation((obj) => {
		checkGeoMode = 1;
		// *** //
		const ret = {
			longitude : obj.longitude,
			latitude : obj.latitude
		};
		// *** //
		clbk( ret );
	});

	// Alternative Verbindung
	if ( checkGeoMode == 0 )
	{

		// Verbindung zum Navigator
		const internGeoAPI = navigator.geolocation;

		// Verfügbarkeit des Dientes prüfen...
		if ( internGeoAPI )
		{
			internGeoAPI.getCurrentPosition((coord) =>
				{
					const ret = {
						longitude : coord.coords.longitude,
						latitude : coord.coords.latitude
					};
					// *** //
					clbk( ret );
				}
			);
		}
		// Geolocation steht nicht zu Verfügung
		{
			console.log("Please allow acces to the Browser's GeolocationAPI");
		}

	}

}
