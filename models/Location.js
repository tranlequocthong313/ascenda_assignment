class Location {
  constructor(builder) {
    this.lat = builder.lat;
    this.lng = builder.lng;
    this.address = builder.address;
    this.city = builder.city;
    this.country = builder.country;
  }
}

module.exports = Location;
