const Hotel = require('../Hotel');

class HotelBuilder {
  setId(id) {
    this.id = id;
    return this;
  }

  setDestinationId(destinationId) {
    this.destinationId = destinationId;
    return this;
  }

  setName(name) {
    this.name = name;
    return this;
  }

  setDescription(description) {
    this.description = description;
    return this;
  }

  setLocation(location) {
    this.location = location;
    return this;
  }

  setAmenities(amenities) {
    this.amenities = amenities;
    return this;
  }

  setImages(images) {
    this.images = images;
    return this;
  }

  setBookingConditions(bookingConditions) {
    this.bookingConditions = bookingConditions;
    return this;
  }

  build() {
    return new Hotel(this);
  }
}

module.exports = HotelBuilder;
