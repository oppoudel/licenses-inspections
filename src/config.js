const today = new Date();
const newDate = new Date(today.setDate(today.getDate() - 7));
const trimDate = newDate
  .toISOString()
  .substr(0, newDate.toISOString().indexOf('.'));
const urlExt =
  "&$where=calldatetime>'" + trimDate + "'&$order=calldatetime desc";
const callsUrl = encodeURI(
  'https://data.baltimorecity.gov/resource/m8g9-abgb.geojson?$limit=10000' +
    urlExt
);
export const geoQueries = [
  {
    name: 'liquorLicenses',
    url:
      'https://data.baltimorecity.gov/resource/g2jf-x8pp.geojson?$limit=50000&licenseyear=2017',
    attributes: {
      'Trade Name': 'tradename',
      'License End Date': 'licenseenddate',
      'Licensee First Name': 'licenseefirstname',
      'Licensee Last Name': 'licenseelastname'
    }
  },
  {
    name: 'callsForService',
    url: callsUrl,
    attributes: {
      Description: 'description',
      Location: 'incidentlocation',
      Priority: 'priority',
      'Call Date': 'calldatetime',
      'Call Number': 'callnumber'
    }
  }
];
