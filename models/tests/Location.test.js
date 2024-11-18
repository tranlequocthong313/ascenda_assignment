const Location = require('../Location');
const LocationBuilder = require('../builders/LocationBuilder');

describe('Location and LocationBuilder', () => {
  it('should build an Location object with provided values', () => {
    const builder = new LocationBuilder();
    const location = builder
      .setAddress('123 Ho Chi Minh City')
      .setCity('Ho Chi Minh City')
      .setCountry('Vietnam')
      .setLat(123450235)
      .setLng(699406304)
      .build();

    expect(location).toBeInstanceOf(Location);
    expect(location.address).toEqual('123 Ho Chi Minh City');
    expect(location.city).toEqual('Ho Chi Minh City');
    expect(location.country).toEqual('Vietnam');
    expect(location.lat).toEqual(123450235);
    expect(location.lng).toEqual(699406304);
  });

  it('should default to empty values if no values are provided', () => {
    const builder = new LocationBuilder();
    const location = builder.build();

    expect(location.address).toEqual(undefined);
    expect(location.city).toEqual(undefined);
    expect(location.country).toEqual(undefined);
    expect(location.lat).toEqual(undefined);
    expect(location.lng).toEqual(undefined);
  });
});
