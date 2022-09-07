var Request = require('request');


var AddressDetails = {
    
    for: function (address, callback) {
        var url = "http://maps.googleapis.com/maps/api/geocode/json?address=" + encodeURI(address) + "&sensor=false";
        
        Request(url, function (err, response, body) {
            if (err) return callback && callback(err);
            
            var data = JSON.parse(body);
            
            if (data.results.length == 0) return callback && callback('No address found');
            
            var result = data.results[0];
            
            var components = {};
            ['street_number', 'route', 'locality', 'administrative_area_level_1', 'country', 'postal_code'].forEach(function (key) {
                result.address_components.forEach(function (component) {
                    if (component.types.indexOf(key) > -1) {
                        components[key] = component;
                    }
                });
            });
            
            var address = {
                fullAddress: result.formatted_address,
                street: components.street_number ? components.street_number.short_name + ' ' + components.route.short_name : null,
                suburb: components.locality ? components.locality.long_name : null,
                postCode: components.postal_code ? components.postal_code.short_name : null,
                state: components.administrative_area_level_1 ? components.administrative_area_level_1.short_name : null,
                country: components.country ? components.country.long_name : null,
                latitude: result.geometry.location.lat,
                longitude: result.geometry.location.lng
            };
            
            return callback && callback(null, address);
        });
    }
    
}


module.exports = AddressDetails;