const BaseSupplierTemplate = require('./BaseSupplierTemplate');
const HotelBuilder = require('../models/builders/HotelBuilder');
const LocationBuilder = require('../models/builders/LocationBuilder');
const AmenitiesBuilder = require('../models/builders/AmenitiesBuilder');
const { ACME_ENDPOINT } = require('../utils/constants');

class Acme extends BaseSupplierTemplate {
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
