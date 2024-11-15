const HotelsService = require('../HotelsService');
const Hotel = require('../../models/Hotel');

describe('HotelsService', () => {
  beforeEach(() => {
    hotelsService = new HotelsService();
  });

  describe('mergeAndSave', () => {
    it('should merge and save unique hotels', () => {
      const hotelData = [
        { id: 1, destinationId: 1, name: 'Hotel A' },
        { id: 2, destinationId: 2, name: 'Hotel B' },
      ];

      hotelsService.mergeAndSave(hotelData);

      expect(hotelsService.hotels.length).toBe(2);
      expect(hotelsService.hotels[0].id).toBe(1);
      expect(hotelsService.hotels[1].id).toBe(2);
    });

    it('should handle merging duplicate hotels', () => {
      const hotelData = [
        { id: 1, destinationId: 1, name: 'Hotel A' },
        { id: 1, destinationId: 1, name: 'Hotel A Updated' },
      ];

      hotelsService.mergeAndSave(hotelData);

      expect(hotelsService.hotels.length).toBe(1);
      expect(hotelsService.hotels[0].name).toBe('Hotel A Updated');
    });

    it('should create a new Hotel instance after cleaning', () => {
      const hotelData = [
        { id: 1, destinationId: 1, name: 'Hotel A' },
        { id: 1, destinationId: 1, name: '  Hotel A Updated ' },
      ];

      hotelsService.mergeAndSave(hotelData);

      expect(hotelsService.hotels[0]).toEqual(
        new Hotel({
          id: 1,
          destinationId: 1,
          name: 'Hotel A Updated',
        })
      );
    });
  });

  describe('find', () => {
    it('should return all hotels if no filters are provided', () => {
      const hotelData = [
        { id: 1, destinationId: 1, name: 'Hotel A' },
        { id: 2, destinationId: 2, name: 'Hotel B' },
      ];

      hotelsService.mergeAndSave(hotelData);
      const result = hotelsService.find();

      expect(result.length).toBe(2);
      expect(result[0].name).toBe('Hotel A');
      expect(result[1].name).toBe('Hotel B');
    });

    it('should return all hotels if no destinationId filter is provided', () => {
      const hotelData = [
        { id: 1, destinationId: 1, name: 'Hotel A' },
        { id: 2, destinationId: 2, name: 'Hotel B' },
      ];

      hotelsService.mergeAndSave(hotelData);
      const result = hotelsService.find([1]);

      expect(result.length).toBe(2);
      expect(result[0].name).toBe('Hotel A');
      expect(result[1].name).toBe('Hotel B');
    });

    it('should return all hotels if no hotelIds filter is provided', () => {
      const hotelData = [
        { id: 1, destinationId: 1, name: 'Hotel A' },
        { id: 2, destinationId: 2, name: 'Hotel B' },
      ];

      hotelsService.mergeAndSave(hotelData);
      const result = hotelsService.find([], [2]);

      expect(result.length).toBe(2);
      expect(result[0].name).toBe('Hotel A');
      expect(result[1].name).toBe('Hotel B');
    });

    it('should filter hotels by both hotelIds and destinationIds', () => {
      const hotelData = [
        { id: 1, destinationId: 1, name: 'Hotel A' },
        { id: 2, destinationId: 2, name: 'Hotel B' },
      ];

      hotelsService.mergeAndSave(hotelData);
      const result = hotelsService.find([1], [1]);

      expect(result.length).toBe(1);
      expect(result[0].name).toBe('Hotel A');
    });
  });
});
