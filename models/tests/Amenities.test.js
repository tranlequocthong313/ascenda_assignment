const Amenities = require('../Amenities');
const AmenitiesBuilder = require('../builders/AmenitiesBuilder');

describe('Amenities and AmenitiesBuilder', () => {
  it('should build an Amenities object with provided values', () => {
    const builder = new AmenitiesBuilder();
    const amenities = builder
      .setGeneral(['outdoor pool', 'wifi', 'business center'])
      .setRoom(['aircon', 'tv', 'coffee machine'])
      .build();

    expect(amenities).toBeInstanceOf(Amenities);
    expect(amenities.general).toEqual([
      'outdoor pool',
      'wifi',
      'business center',
    ]);
    expect(amenities.room).toEqual(['aircon', 'tv', 'coffee machine']);
  });

  it('should default to empty arrays if no values are provided', () => {
    const builder = new AmenitiesBuilder();
    const amenities = builder.build();

    expect(amenities.general).toEqual([]);
    expect(amenities.room).toEqual([]);
  });
});
