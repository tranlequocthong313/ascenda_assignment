const Location = require('../Location');

class LocationBuilder {
  setLat(lat) {
    this.lat = lat;
    return this;
  }

  setLng(lng) {
    this.lng = lng;
    return this;
  }

  setAddress(address) {
    this.address = address;
    return this;
  }

  setCity(city) {
    this.city = city;
    return this;
  }

  setCountry(country) {
    this.country = country;
    return this;
  }

  build() {
    return new Location(this);
  }
}

module.exports = LocationBuilder;
