const Images = require('../Images');
const ImagesBuilder = require('../ImagesBuilder');

describe('Images and ImagesBuilder', () => {
  it('should build an Images object with provided values', () => {
    const builder = new ImagesBuilder();
    const images = builder
      .setRooms(['outdoor pool', 'wifi', 'business center'])
      .setAmenities(['aircon', 'tv', 'coffee machine'])
      .setSite(['aircon', 'tv', 'coffee machine'])
      .build();

    expect(images).toBeInstanceOf(Images);
    expect(images.rooms).toEqual(['outdoor pool', 'wifi', 'business center']);
    expect(images.amenities).toEqual(['aircon', 'tv', 'coffee machine']);
    expect(images.site).toEqual(['aircon', 'tv', 'coffee machine']);
  });

  it('should default to empty arrays if no values are provided', () => {
    const builder = new ImagesBuilder();
    const images = builder.build();

    expect(images.rooms).toEqual([]);
    expect(images.amenities).toEqual([]);
    expect(images.site).toEqual([]);
  });
});
