const Images = require('./Images');

class ImagesBuilder {
  setRooms(rooms) {
    this.rooms = rooms;
    return this;
  }

  setSite(site) {
    this.site = site;
    return this;
  }

  setAmenities(amenities) {
    this.amenities = amenities;
    return this;
  }

  build() {
    return new Images(this);
  }
}

module.exports = ImagesBuilder;
