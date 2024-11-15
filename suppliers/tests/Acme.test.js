const Acme = require('../Acme');
const { ACME_ENDPOINT } = require('../../utils/constants');
const Hotel = require('../../models/Hotel');

describe('Acme Supplier', () => {
  it('should return correct endpoint', () => {
    const acme = new Acme();

    expect(acme.endpoint()).toEqual(ACME_ENDPOINT);
  });

  it('should parse the data to Hotel instance', () => {
    const acme = new Acme();
    const dto = {
      Id: 'iJhz',
      DestinationId: 5432,
      Name: 'Beach Villas Singapore',
      Latitude: 1.264751,
      Longitude: 103.824006,
      Address: ' 8 Sentosa Gateway, Beach Villas ',
      City: 'Singapore',
      Country: 'SG',
      PostalCode: '098269',
      Description:
        '  This 5 star hotel is located on the coastline of Singapore.',
      Facilities: [
        'Pool',
        'BusinessCenter',
        'WiFi ',
        'DryCleaning',
        ' Breakfast',
      ],
    };

    const result = acme.parse(dto);

    expect(result).toBeInstanceOf(Hotel);
    expect(result.id).toEqual(dto.Id);
    expect(result.destinationId).toEqual(dto.DestinationId);
    expect(result.name).toEqual(dto.Name);
    expect(result.location.lat).toEqual(dto.Latitude);
    expect(result.location.lng).toEqual(dto.Longitude);
    expect(result.location.address).toEqual(dto.Address);
    expect(result.location.city).toEqual(dto.City);
    expect(result.location.country).toEqual(dto.Country);
    expect(result.description).toEqual(dto.Description);
    expect(result.amenities.general).toEqual(dto.Facilities);
  });
});
