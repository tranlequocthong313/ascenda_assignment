class Validator {
  static areBothObjects(obj1, obj2) {
    return Validator.isObject(obj1) && Validator.isObject(obj2);
  }

  static areBothArrays(obj1, obj2) {
    return Array.isArray(obj1) && Array.isArray(obj2);
  }

  static areBothStrings(value1, value2) {
    return Validator.isString(value1) && Validator.isString(value2);
  }

  static isObject(obj) {
    return typeof obj === 'object' && obj !== null;
  }

  static isArray(obj) {
    return Array.isArray(obj);
  }

  static isString(obj) {
    return typeof obj === 'string' || obj instanceof String;
  }

  static isEmptyArray(arr) {
    return this.isArray(arr) && arr.length === 0;
  }
}

module.exports = Validator;
