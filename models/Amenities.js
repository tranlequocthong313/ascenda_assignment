class Amenities {
  constructor(builder) {
    this.general = builder.general || [];
    this.room = builder.room || [];
  }
}

module.exports = Amenities;
