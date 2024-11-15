const ObjectCleaner = require('../ObjectCleaner');

describe('ObjectCleaner', () => {
  let cleaner;

  beforeEach(() => {
    cleaner = new ObjectCleaner();
  });

  describe('cleanObject', () => {
    it('should throw an error if input is not an object', () => {
      expect(() => cleaner.cleanObject('not an object')).toThrow(
        'Input must be object'
      );
    });

    it('should trim string values in a flat object', () => {
      const obj = { name: '  John Doe  ', age: 30 };

      const result = cleaner.cleanObject(obj);

      expect(result).toEqual({ name: 'John Doe', age: 30 });
    });

    it('should recursively clean nested objects', () => {
      const obj = {
        user: {
          name: '  Alice  ',
          details: { city: '  Wonderland  ' },
        },
      };

      const result = cleaner.cleanObject(obj);

      expect(result).toEqual({
        user: {
          name: 'Alice',
          details: { city: 'Wonderland' },
        },
      });
    });

    it('should handle arrays and clean their elements', () => {
      const obj = { items: ['  item1  ', '  item2  '] };

      const result = cleaner.cleanObject(obj);

      expect(result).toEqual({ items: ['item1', 'item2'] });
    });

    it('should handle mixed types within objects', () => {
      const obj = {
        name: '  Test  ',
        value: 123,
        active: true,
        nested: { key: '  Nested Value  ' },
      };

      const result = cleaner.cleanObject(obj);

      expect(result).toEqual({
        name: 'Test',
        value: 123,
        active: true,
        nested: { key: 'Nested Value' },
      });
    });
  });
});
