const Amenities = require('../Amenities');

class AmenitiesBuilder {
  setGeneral(general) {
    this.general = general;
    return this;
  }

  setRoom(room) {
    this.room = room;
    return this;
  }

  build() {
    return new Amenities(this);
  }
}

module.exports = AmenitiesBuilder;
