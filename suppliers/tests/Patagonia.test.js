const Patagonia = require('../Patagonia');
const { PATAGONIA_ENDPOINT } = require('../../utils/constants');
const Hotel = require('../../models/Hotel');
const Image = require('../../models/Image');

describe('Patagonia Supplier', () => {
  it('should return correct endpoint', () => {
    const patagonia = new Patagonia();

    expect(patagonia.endpoint()).toEqual(PATAGONIA_ENDPOINT);
  });

  it('should parse the data to Hotel instance', () => {
    const patagonia = new Patagonia();
    const dto = {
      id: 'iJhz',
      destination: 5432,
      name: 'Beach Villas Singapore',
      lat: 1.264751,
      lng: 103.824006,
      address: '8 Sentosa Gateway, Beach Villas, 098269',
      info: 'Located at the western tip of Resorts World Sentosa, guests at the Beach Villas are guaranteed privacy while they enjoy spectacular views of glittering waters. Guests will find themselves in paradise with this series of exquisite tropical sanctuaries, making it the perfect setting for an idyllic retreat. Within each villa, guests will discover living areas and bedrooms that open out to mini gardens, private timber sundecks and verandahs elegantly framing either lush greenery or an expanse of sea. Guests are assured of a superior slumber with goose feather pillows and luxe mattresses paired with 400 thread count Egyptian cotton bed linen, tastefully paired with a full complement of luxurious in-room amenities and bathrooms boasting rain showers and free-standing tubs coupled with an exclusive array of ESPA amenities and toiletries. Guests also get to enjoy complimentary day access to the facilities at Asia’s flagship spa – the world-renowned ESPA.',
      amenities: [
        'Aircon',
        'Tv',
        'Coffee machine',
        'Kettle',
        'Hair dryer',
        'Iron',
        'Tub',
      ],
      images: {
        rooms: [
          {
            url: 'https://d2ey9sqrvkqdfs.cloudfront.net/0qZF/2.jpg',
            description: 'Double room',
          },
          {
            url: 'https://d2ey9sqrvkqdfs.cloudfront.net/0qZF/4.jpg',
            description: 'Bathroom',
          },
        ],
        amenities: [
          {
            url: 'https://d2ey9sqrvkqdfs.cloudfront.net/0qZF/0.jpg',
            description: 'RWS',
          },
          {
            url: 'https://d2ey9sqrvkqdfs.cloudfront.net/0qZF/6.jpg',
            description: 'Sentosa Gateway',
          },
        ],
      },
    };

    const result = patagonia.parse(dto);

    expect(result).toBeInstanceOf(Hotel);
    expect(result.id).toEqual(dto.id);
    expect(result.destinationId).toEqual(dto.destination);
    expect(result.name).toEqual(dto.name);
    expect(result.location.lat).toEqual(dto.lat);
    expect(result.location.lng).toEqual(dto.lng);
    expect(result.location.address).toEqual(dto.address);
    expect(result.description).toEqual(dto.info);
    expect(result.amenities.general).toEqual(dto.amenities);
    expect(result.images.rooms[0]).toBeInstanceOf(Image);
    expect(result.images.amenities[0]).toBeInstanceOf(Image);
    expect(result.images.rooms[0].link).toEqual(dto.images.rooms[0].url);
    expect(result.images.rooms[0].description).toEqual(
      dto.images.rooms[0].description
    );
    expect(result.images.amenities[0].link).toEqual(
      dto.images.amenities[0].url
    );
    expect(result.images.amenities[0].description).toEqual(
      dto.images.amenities[0].description
    );
  });
});
