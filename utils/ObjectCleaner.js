const Validator = require('./Validator');

class ObjectCleaner {
  cleanObject(obj) {
    if (!Validator.isObject(obj)) {
      throw new Error('Input must be an object');
    }

    const result = Validator.isArray(obj) ? [] : {};
    const keys = Object.keys(obj);

    keys.forEach((key) => {
      let value = obj[key];

      if (Validator.isObject(value)) {
        result[key] = this.cleanObject(value);
      } else {
        result[key] = typeof value === 'string' ? value.trim() : value;
      }
    });

    return result;
  }
}

module.exports = ObjectCleaner;
