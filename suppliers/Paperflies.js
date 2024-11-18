const BaseSupplierTemplate = require('./BaseSupplierTemplate');
const HotelBuilder = require('../models/builders/HotelBuilder');
const LocationBuilder = require('../models/builders/LocationBuilder');
const AmenitiesBuilder = require('../models/builders/AmenitiesBuilder');
const ImagesBuilder = require('../models/builders/ImagesBuilder');
const Image = require('../models/Image');
const { PAPERFLIES_ENDPOINT } = require('../utils/constants');

class Paperflies extends BaseSupplierTemplate {
  endpoint() {
    return PAPERFLIES_ENDPOINT;
  }

  parse(dto) {
    const location = new LocationBuilder()
      .setAddress(dto.location.address)
      .setCountry(dto.location.country)
      .build();

    const amenities = new AmenitiesBuilder()
      .setGeneral(dto.amenities.general)
      .setRoom(dto.amenities.room)
      .build();

    const roomImages = dto.images.rooms.map(
      (room) => new Image(room.link, room.caption)
    );
    const siteImages = dto.images.site.map(
      (site) => new Image(site.link, site.caption)
    );
    const images = new ImagesBuilder()
      .setRooms(roomImages)
      .setSite(siteImages)
      .build();

    return new HotelBuilder()
      .setId(dto.hotel_id)
      .setDestinationId(dto.destination_id)
      .setName(dto.hotel_name)
      .setLocation(location)
      .setDescription(dto.details)
      .setAmenities(amenities)
      .setImages(images)
      .setBookingConditions(dto.booking_conditions)
      .build();
  }
}

module.exports = Paperflies;
