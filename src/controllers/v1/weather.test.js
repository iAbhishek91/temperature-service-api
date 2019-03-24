import {
  validateLongitude,
  validateLatitude,
  calculateTemperatureHumidity,
  deterimineResponse,
} from './weather';
import {
  arcticRegionConstraints,
  tropicalRegionConstraints,
  regionBwTropicalAndArcticConstraints,
} from '../../constants';

describe('weather', () => {
  describe('weather middleware', () => {
    test('validate longitude 10 and latitude 19 should return status 200', () => {
      const { status } = deterimineResponse(10, 19);

      expect(status).toBe(200);
    });

    test('validate longitude 10 and latitude 19 should return temperature', () => {
      const { json } = deterimineResponse(10, 19);

      expect(json.temperature).toBeTruthy();
    });

    test('validate longitude 10 and latitude 19 should return humidity', () => {
      const { json } = deterimineResponse(10, 19);

      expect(json.humidity).toBeTruthy();
    });

    test('validate longitude 10 and latitude 19 should not return error', () => {
      const { json } = deterimineResponse(10, 19);

      expect(json.error).toBeFalsy();
    });

    test('validate longitude 190 and latitude 98 should return error status 400', () => {
      const { status } = deterimineResponse(198, 19);

      expect(status).toBe(400);
    });

    test('validate longitude 190 and latitude 98 should return error message', () => {
      const { json } = deterimineResponse(198, 19);

      expect(json.error).toBeTruthy();
    });

    test('validate longitude 190 and latitude 98 should not return temperature', () => {
      const { json } = deterimineResponse(198, 19);

      expect(json.temperature).toBeFalsy();
    });

    test('validate longitude 190 and latitude 98 should not return humidity', () => {
      const { json } = deterimineResponse(198, 19);

      expect(json.humidity).toBeFalsy();
    });
  });

  describe('validateLongitude', () => {
    [{
      testName: 'string should return "false"',
      longitude: 'string',
      expected: false,
    }, {
      testName: 'symbols should return "false"',
      longitude: '@£$!@£$',
      expected: false,
    }, {
      testName: '180.01 should return "false"',
      longitude: '180.01',
      expected: false,
    }, {
      testName: '181 should return "false"',
      longitude: '181',
      expected: false,
    }, {
      testName: '-180.01 should return "false"',
      longitude: '-180.01',
      expected: false,
    }, {
      testName: '-181 should return "false"',
      longitude: '-181',
      expected: false,
    }, {
      testName: '"" should return "false"',
      longitude: '',
      expected: false,
    }, {
      testName: '-180 should return "true"',
      longitude: '-180',
      expected: true,
    }, {
      testName: '180 should return "true"',
      longitude: '180',
      expected: true,
    }, {
      testName: '0 should return "true"',
      longitude: '0',
      expected: true,
    }, {
      testName: '150 as number should return "true"',
      longitude: 150,
      expected: true,
    }].forEach((testCase) => {
      test(`validate ${testCase.testName}`, () => {
        expect(
          validateLongitude(testCase.longitude),
        ).toBe(testCase.expected);
      });
    });
  });

  describe('validateLatitude', () => {
    [{
      testName: 'string should return "false"',
      latitude: 'string',
      expected: false,
    }, {
      testName: 'symbols should return "false"',
      latitude: '@£$!@£$',
      expected: false,
    }, {
      testName: '90.01 should return "false"',
      latitude: '90.01',
      expected: false,
    }, {
      testName: '91 should return "false"',
      latitude: '91',
      expected: false,
    }, {
      testName: '-90.01 should return "false"',
      latitude: '-90.01',
      expected: false,
    }, {
      testName: '-91 should return "false"',
      latitude: '-91',
      expected: false,
    }, {
      testName: '"" should return "false"',
      latitude: '',
      expected: false,
    }, {
      testName: '-90 should return "true"',
      latitude: '-90',
      expected: true,
    }, {
      testName: '90 should return "true"',
      latitude: '90',
      expected: true,
    }, {
      testName: '0 should return "true"',
      latitude: '0',
      expected: true,
    }, {
      testName: '30 as number should return "true"',
      latitude: 30,
      expected: true,
    }].forEach((testCase) => {
      test(`validate ${testCase.testName}`, () => {
        expect(
          validateLatitude(testCase.latitude),
        ).toBe(testCase.expected);
      });
    });
  });

  describe('calculateTemperatureHumidity', () => {
    test('validate temperature and humidity should be returned between defined range for arctic region', () => {
      const {
        temperature,
        humidity,
      } = calculateTemperatureHumidity('-100.78', '80.6768');

      const isTemperatureValid = temperature <= arcticRegionConstraints.temperature.max
      && temperature >= arcticRegionConstraints.temperature.min;
      const isHumidityValid = humidity <= arcticRegionConstraints.humidity.max
      && humidity >= arcticRegionConstraints.humidity.min;

      expect(isTemperatureValid).toBe(true);
      expect(isHumidityValid).toBe(true);
    });

    test('validate temperature and humidity should be returned between defined range for tropical region', () => {
      const {
        temperature,
        humidity,
      } = calculateTemperatureHumidity('-100.78', '5.6768');

      const isTemperatureValid = temperature <= tropicalRegionConstraints.temperature.max
      && temperature >= tropicalRegionConstraints.temperature.min;
      const isHumidityValid = humidity <= tropicalRegionConstraints.humidity.max
      && humidity >= tropicalRegionConstraints.humidity.min;

      expect(isTemperatureValid).toBe(true);
      expect(isHumidityValid).toBe(true);
    });

    test('validate temperature and humidity should be returned between defined range for in between region', () => {
      const {
        temperature,
        humidity,
      } = calculateTemperatureHumidity('-100.78', '-30.6768');

      const isTemperatureValid = temperature <= regionBwTropicalAndArcticConstraints.temperature.max
      && temperature >= regionBwTropicalAndArcticConstraints.temperature.min;
      const isHumidityValid = humidity <= regionBwTropicalAndArcticConstraints.humidity.max
      && humidity >= regionBwTropicalAndArcticConstraints.humidity.min;

      expect(isTemperatureValid).toBe(true);
      expect(isHumidityValid).toBe(true);
    });
  });
});
