import { valueBetween } from './util';

const errorValueBetween = { error: 'invalid range' };

describe('util', () => {
  test('validate error is returned when "min" is greater than "max"', () => {
    expect(valueBetween(20, 10)).toEqual(errorValueBetween);
  });

  test('validate error is returned when "min" is less than 0', () => {
    expect(valueBetween(-5, 10)).toEqual(errorValueBetween);
  });

  test('validate error is returned when "min" is greater than 100', () => {
    expect(valueBetween(101, 10)).toEqual(errorValueBetween);
  });

  test('validate error is returned when "max" is less than 0', () => {
    expect(valueBetween(10, -5)).toEqual(errorValueBetween);
  });

  test('validate error is returned when "max" is greater than 100', () => {
    expect(valueBetween(10, 102)).toEqual(errorValueBetween);
  });
});
