class BaseSupplierTemplate {
  async fetch() {
    const response = await fetch(this.endpoint());
    const data = await response.json();
    return data.map(this.parse);
  }

  endpoint() {
    throw new Error('endpoint() must be implemented by subclass');
  }

  parse(data) {
    throw new Error('parse() must be implemented by subclass');
  }
}

module.exports = BaseSupplierTemplate;
