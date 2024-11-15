const Hotel = require('../../models/Hotel');
const Validator = require('../Validator');

describe('Validator', () => {
  it('should return true when given two objects', () => {
    expect(Validator.areBothObjects({}, {})).toEqual(true);
    expect(Validator.areBothObjects({}, [])).toEqual(true);
    expect(Validator.areBothObjects(new Object(), {})).toEqual(true);
  });

  it('should return false when not given two objects or given null', () => {
    expect(Validator.areBothObjects(null, {})).toEqual(false);
    expect(Validator.areBothObjects({}, null)).toEqual(false);
    expect(Validator.areBothObjects(null, null)).toEqual(false);
  });

  it('should return true when given two arrays', () => {
    expect(Validator.areBothArrays([], [])).toEqual(true);
    expect(Validator.areBothArrays(new Array(), new Array(5))).toEqual(true);
    expect(Validator.areBothArrays([], new Array(5))).toEqual(true);
  });

  it('should return false when not given two arrays', () => {
    expect(Validator.areBothArrays([], {})).toEqual(false);
    expect(Validator.areBothArrays({}, new Array(5))).toEqual(false);
    expect(Validator.areBothArrays({}, {})).toEqual(false);
    expect(Validator.areBothArrays(1, '2')).toEqual(false);
  });

  it('should return true when given two strings', () => {
    expect(Validator.areBothStrings('a', 'b')).toEqual(true);
    expect(Validator.areBothStrings(new String(), new String())).toEqual(true);
    expect(Validator.areBothStrings('abc', new String())).toEqual(true);
  });

  it('should return false when not given two arrays', () => {
    expect(Validator.areBothStrings('1', 2)).toEqual(false);
    expect(Validator.areBothStrings(1, '2')).toEqual(false);
    expect(Validator.areBothStrings(new Number(), new String())).toEqual(false);
  });

  it('should return true when given an empty array', () => {
    expect(Validator.isEmptyArray([])).toEqual(true);
    expect(Validator.isEmptyArray(new Array())).toEqual(true);
    expect(Validator.isEmptyArray(new Array(0))).toEqual(true);
  });

  it('should return false when given a not empty array', () => {
    expect(Validator.isEmptyArray([1, 2, 3])).toEqual(false);
    expect(Validator.isEmptyArray(new Array(5))).toEqual(false);
    expect(Validator.isEmptyArray(new Array(1, 2, 3, 4, 5))).toEqual(false);
  });
});
