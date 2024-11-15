const ObjectMerger = require('../utils/ObjectMerger');
const ObjectCleaner = require('../utils/ObjectCleaner');
const Hotel = require('../models/Hotel');
const Validator = require('../utils/Validator');

class HotelsService {
  constructor() {
    this.merger = new ObjectMerger();
    this.cleaner = new ObjectCleaner();
    this.hotels = [];
  }

  mergeAndSave(hotelData) {
    const hotelsByKey = {};

    hotelData.forEach((hotel) => {
      const key = `${hotel.id}-${hotel.destinationId}`;

      if (!hotelsByKey[key]) {
        hotelsByKey[key] = hotel;
      } else {
        hotelsByKey[key] = this.merger.mergeObjects(hotelsByKey[key], hotel);
        hotelsByKey[key] = this.cleaner.cleanObject(hotelsByKey[key]);
        hotelsByKey[key] = new Hotel(hotelsByKey[key]);
      }
    });

    this.hotels = Object.values(hotelsByKey);
  }

  find(hotelIds = [], destinationIds = []) {
    hotelIds = hotelIds.map(String);
    destinationIds = destinationIds.map(Number);

    if (
      Validator.isEmptyArray(hotelIds) ||
      Validator.isEmptyArray(destinationIds)
    ) {
      return this.hotels;
    }

    const shouldIncludeHotel = (hotel) => {
      const matchesHotelId = hotelIds.includes(String(hotel.id));
      const matchesDestinationId = destinationIds.includes(
        Number(hotel.destinationId)
      );
      return matchesHotelId && matchesDestinationId;
    };

    return this.hotels.filter(shouldIncludeHotel);
  }
}

module.exports = HotelsService;
