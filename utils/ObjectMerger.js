const Validator = require('./Validator');
const sanitizedDictionary = require('./dictionary');

class ObjectMerger {
  mergeObjects(obj1, obj2) {
    if (!Validator.areBothObjects(obj1, obj2)) {
      throw new Error('Both inputs must be objects');
    }

    let result = Validator.areBothArrays(obj1, obj2) ? [] : {};
    const keys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);

    keys.forEach((key) => {
      const value1 = obj1[key];
      const value2 = obj2[key];

      if (Validator.areBothObjects(value1, value2)) {
        result[key] = this.mergeObjects(value1, value2);
      } else {
        if (Validator.isArray(result)) {
          result.push(this._getSanitizedString(value1));
          result.push(this._getSanitizedString(value2));
        } else {
          result[key] = this._getBetterValue(value1, value2);
          if (Validator.isArray(result[key])) {
            result[key] = result[key].map((item) =>
              this._getSanitizedString(item)
            );
          }
        }
      }
    });

    result = this._removeNullAndDuplications(result);

    return result;
  }

  _getSanitizedString(string) {
    const result =
      string &&
      sanitizedDictionary[this._getLowerCaseWithoutSpaceString(string)];
    return result || string;
  }

  _getBetterValue(value1, value2) {
    if (Validator.areBothStrings(value1, value2)) {
      value1 = this._getSanitizedString(value1);
      value2 = this._getSanitizedString(value2);
      return value1.length >= value2.length ? value1 : value2;
    } else {
      return value1 ? value1 : value2;
    }
  }

  _getLowerCaseWithoutSpaceString(string) {
    return Validator.isString(string)
      ? string.toLowerCase().replace(/\s+/g, '')
      : string;
  }

  _removeNullAndDuplications(arr) {
    if (Validator.isArray(arr)) {
      arr = Array.from(new Set(arr)).filter(
        (item) => item !== null && item !== undefined
      );
    }
    return arr;
  }
}

module.exports = ObjectMerger;
