const BaseSupplier = require('./BaseSupplier');
const HotelBuilder = require('../models/HotelBuilder');
const LocationBuilder = require('../models/LocationBuilder');
const AmenitiesBuilder = require('../models/AmenitiesBuilder');
const { ACME_ENDPOINT } = require('../utils/constants');

class Acme extends BaseSupplier {
  endpoint() {
    return ACME_ENDPOINT;
  }

  parse(dto) {
    const location = new LocationBuilder()
      .setLat(dto.Latitude)
      .setLng(dto.Longitude)
      .setAddress(dto.Address)
      .setCity(dto.City)
      .setCountry(dto.Country)
      .build();

    const amenities = new AmenitiesBuilder().setGeneral(dto.Facilities).build();

    return new HotelBuilder()
      .setId(dto.Id)
      .setDestinationId(dto.DestinationId)
      .setName(dto.Name)
      .setLocation(location)
      .setDescription(dto.Description)
      .setAmenities(amenities)
      .build();
  }
}

module.exports = Acme;
