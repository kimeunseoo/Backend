# Address Details

Look up the details for a given address.


## Usage

`npm install --save address-details`

```javascript
var AddressDetails = require('address-details');


AddressDetails.for('100 Queen St, Brisbane, Australia', function (err, details) {
    console.log(details.fullAddress); // 100 Queen St, Brisbane QLD 4000, Australia
    console.log(details.street); // 100 Queen St
    console.log(details.state); // QLD
    console.log(details.postCode); // 4000
    console.log(details.country); // Australia
    console.log(details.latitude); // -27.4699397
    console.log(details.longitude); // 153.0248197
});
```