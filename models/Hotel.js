class Hotel {
  constructor(builder) {
    this.id = builder.id;
    this.destinationId = builder.destinationId;
    this.name = builder.name;
    this.location = builder.location || {};
    this.description = builder.description;
    this.amenities = builder.amenities || {};
    this.images = builder.images || {};
    this.bookingConditions = builder.bookingConditions || [];
  }

  toJSON() {
    return {
      id: this.id,
      destination_id: this.destinationId,
      name: this.name,
      location: {
        lat: this.location.lat,
        lng: this.location.lng,
        address: this.location.address,
        city: this.location.city,
        country: this.location.country,
      },
      description: this.description,
      amenities: {
        general: this.amenities.general,
        room: this.amenities.room,
      },
      images: {
        rooms:
          this.images.rooms &&
          this.images.rooms.map((image) => ({
            link: image.link,
            description: image.description,
          })),
        site:
          this.images.site &&
          this.images.site.map((image) => ({
            link: image.link,
            description: image.description,
          })),
        amenities:
          this.images.amenities &&
          this.images.amenities.map((image) => ({
            link: image.link,
            description: image.description,
          })),
      },
      booking_conditions: this.bookingConditions,
    };
  }
}

module.exports = Hotel;
