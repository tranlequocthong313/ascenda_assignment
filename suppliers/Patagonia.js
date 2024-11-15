const BaseSupplier = require('./BaseSupplier');
const HotelBuilder = require('../models/HotelBuilder');
const LocationBuilder = require('../models/LocationBuilder');
const AmenitiesBuilder = require('../models/AmenitiesBuilder');
const ImagesBuilder = require('../models/ImagesBuilder');
const Image = require('../models/Image');
const { PATAGONIA_ENDPOINT } = require('../utils/constants');

class Acme extends BaseSupplier {
  endpoint() {
    return PATAGONIA_ENDPOINT;
  }

  parse(dto) {
    const location = new LocationBuilder()
      .setLat(dto.lat)
      .setLng(dto.lng)
      .setAddress(dto.address)
      .build();

    const amenities = new AmenitiesBuilder().setGeneral(dto.amenities).build();

    const roomImages = dto.images.rooms.map(
      (room) => new Image(room.url, room.description)
    );
    const amenityImages = dto.images.amenities.map(
      (amenity) => new Image(amenity.url, amenity.description)
    );
    const images = new ImagesBuilder()
      .setRooms(roomImages)
      .setAmenities(amenityImages)
      .build();

    return new HotelBuilder()
      .setId(dto.id)
      .setDestinationId(dto.destination)
      .setName(dto.name)
      .setLocation(location)
      .setDescription(dto.info)
      .setAmenities(amenities)
      .setImages(images)
      .build();
  }
}

module.exports = Acme;
