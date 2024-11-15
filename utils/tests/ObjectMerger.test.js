const sanitizedDictionary = require('../dictionary');
const ObjectMerger = require('../ObjectMerger');

describe('ObjectMerger', () => {
  let objectMerger;

  beforeEach(() => {
    objectMerger = new ObjectMerger();
  });

  describe('mergeObjects', () => {
    it('should throw an error if either of the inputs is not an object', () => {
      expect(() => objectMerger.mergeObjects({}, null)).toThrow(
        'Both inputs must be objects'
      );
      expect(() => objectMerger.mergeObjects(null, {})).toThrow(
        'Both inputs must be objects'
      );
    });

    it('should return a merged object for simple objects', () => {
      const obj1 = {
        name: 'Beach Villas Singapore',
        description:
          '  This 5 star hotel is located on the coastline of Singapore.',
      };
      const obj2 = {
        id: 'iJhz',
        description:
          'Located at the western tip of Resorts World Sentosa, guests at the Beach Villas are guaranteed privacy while they enjoy spectacular views of glittering waters. Guests will find themselves in paradise with this series of exquisite tropical sanctuaries, making it the perfect setting for an idyllic retreat.',
      };

      const result = objectMerger.mergeObjects(obj1, obj2);

      expect(result).toEqual({
        id: obj2.id,
        name: obj1.name,
        description: obj2.description,
      });
    });

    it('should merge nested objects recursively', () => {
      const obj1 = {
        amenities: {
          rooms: Object.values(sanitizedDictionary).slice(0, 5),
        },
        bookingConditions: [
          'Pets are not allowed.',
          'WiFi is available in all areas and is free of charge.',
          'Free private parking is possible on site (reservation is not needed).',
        ],
        location: {
          address: '8 Sentosa Gateway, Beach Villas, 098269',
          country: 'SG',
        },
      };
      const obj2 = {
        amenities: {
          rooms: Object.values(sanitizedDictionary).slice(5, 10),
        },
        location: {
          address: '8 Sentosa Gateway, Beach Villas, 098269',
          country: 'Singapore',
          city: 'Singapore',
        },
      };

      const result = objectMerger.mergeObjects(obj1, obj2);
      result.amenities.rooms = result.amenities.rooms.sort();

      expect(result).toEqual({
        amenities: {
          rooms: [...obj1.amenities.rooms, ...obj2.amenities.rooms].sort(),
        },
        bookingConditions: obj1.bookingConditions,
        location: {
          address: obj1.location.address,
          country: obj2.location.country,
          city: obj2.location.city,
        },
      });
    });

    it('should merge and sanitize string data with dictionary', () => {
      const obj1 = {
        amenities: {
          rooms: [
            'Aircon',
            'Tv',
            'Coffee machine',
            'Kettle',
            'Hair dryer',
            'Iron',
            'Tub',
          ],
        },
      };
      const obj2 = {
        amenities: {
          rooms: [
            'outdoor pool',
            'indoor pool',
            'business center',
            'childcare',
          ],
        },
      };
      const sanitizedData = [
        ...obj1.amenities.rooms,
        ...obj2.amenities.rooms,
      ].map(
        (room) => sanitizedDictionary[room.toLowerCase().replace(/\s+/g, '')]
      );

      const result = objectMerger.mergeObjects(obj1, obj2);
      result.amenities.rooms = result.amenities.rooms.sort();

      expect(result).toEqual({
        amenities: {
          rooms: sanitizedData.sort(),
        },
      });
    });
  });
});
