class Images {
  constructor(builder) {
    this.rooms = builder.rooms || [];
    this.site = builder.site || [];
    this.amenities = builder.amenities || [];
  }
}

module.exports = Images;
