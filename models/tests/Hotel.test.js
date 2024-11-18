const Hotel = require('../Hotel');
const HotelBuilder = require('../builders/HotelBuilder');
const AmenitiesBuilder = require('../builders/AmenitiesBuilder');
const ImagesBuilder = require('../builders/ImagesBuilder');
const LocationBuilder = require('../builders/LocationBuilder');

describe('Hotel and HotelBuilder', () => {
  it('should build an Hotel object with provided values', () => {
    const builder = new HotelBuilder();
    const amenities = new AmenitiesBuilder().build();
    const images = new ImagesBuilder().build();
    const location = new LocationBuilder().build();

    const hotel = builder
      .setAmenities(amenities)
      .setBookingConditions(['wifi', 'air con', 'tv'])
      .setDescription('Description')
      .setDestinationId(123)
      .setId('abcd')
      .setImages(images)
      .setLocation(location)
      .setName('hotel name')
      .build();

    expect(hotel).toBeInstanceOf(Hotel);
    expect(hotel.bookingConditions).toEqual(['wifi', 'air con', 'tv']);
    expect(hotel.description).toEqual('Description');
    expect(hotel.destinationId).toEqual(123);
    expect(hotel.id).toEqual('abcd');
    expect(hotel.name).toEqual('hotel name');
    expect(hotel.images).toEqual(images);
    expect(hotel.amenities).toEqual(amenities);
    expect(hotel.location).toEqual(location);
  });

  it('should default to empty values if no values are provided', () => {
    const builder = new HotelBuilder();
    const hotel = builder.build();

    expect(hotel.bookingConditions).toEqual([]);
    expect(hotel.images).toEqual({});
    expect(hotel.location).toEqual({});
    expect(hotel.amenities).toEqual({});
    expect(hotel.description).toEqual(undefined);
    expect(hotel.destinationId).toEqual(undefined);
    expect(hotel.id).toEqual(undefined);
    expect(hotel.name).toEqual(undefined);
  });
});
