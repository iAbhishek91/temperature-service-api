import {
  tropicalRegionCode,
  arcticRegionCode,
  regionBwTropicalAndArcticCode,
  tropicalRegionConstraints,
  arcticRegionConstraints,
  regionBwTropicalAndArcticConstraints,
  arcticLatitudeRange,
  tropicalLatitudeRange,
} from '../../constants';
import { valueBetween } from '../../util/util';
import APIError from '../../util/APIError';

export const validateLongitude = longitude => (
  longitude
    ? (Number(longitude) <= 180 && Number(longitude) >= -180)
    : false
);

export const validateLatitude = latitude => (
  latitude
    ? (Number(latitude) <= 90 && Number(latitude) >= -90)
    : false
);

const calculateClimateRegion = (laitiude) => {
  if (
    laitiude <= tropicalLatitudeRange.range1.max
    && laitiude >= tropicalLatitudeRange.range1.min
  ) {
    return tropicalRegionCode;
  }

  if (
    (
      laitiude >= arcticLatitudeRange.range2.min
      && laitiude <= arcticLatitudeRange.range2.max
    )
    || (
      laitiude >= arcticLatitudeRange.range1.min
      && laitiude <= arcticLatitudeRange.range1.max
    )
  ) {
    return arcticRegionCode;
  }

  return regionBwTropicalAndArcticCode;
};

export const calculateTemperatureHumidity = (longitude, latitude) => {
  const climateRegion = calculateClimateRegion(latitude);
  const result = {};

  switch (climateRegion) {
    case tropicalRegionCode:
      result.temperature = valueBetween(
        tropicalRegionConstraints.temperature.min,
        tropicalRegionConstraints.temperature.max,
      );
      result.humidity = valueBetween(
        tropicalRegionConstraints.humidity.min,
        tropicalRegionConstraints.humidity.max,
      );
      break;
    case arcticRegionCode:
      result.temperature = valueBetween(
        arcticRegionConstraints.temperature.min,
        arcticRegionConstraints.temperature.max,
      );
      result.humidity = valueBetween(
        arcticRegionConstraints.humidity.min,
        arcticRegionConstraints.humidity.max,
      );
      break;
    case regionBwTropicalAndArcticCode:
      result.temperature = valueBetween(
        regionBwTropicalAndArcticConstraints.temperature.min,
        regionBwTropicalAndArcticConstraints.temperature.max,
      );
      result.humidity = valueBetween(
        regionBwTropicalAndArcticConstraints.humidity.min,
        regionBwTropicalAndArcticConstraints.humidity.max,
      );
      break;
    default:
      return { error: 'Invalid climate region' };
  }

  if (longitude > 0) {
    result.temperature += 5;
    result.humidity += 5;
  }

  return result;
};

export const deterimineResponse = (longitude, latitude) => {
  let statusCode = 200;
  const response = {};
  let aipError = {};

  if (
    validateLongitude(longitude)
    && validateLatitude(latitude)
  ) {
    let resBody = calculateTemperatureHumidity(longitude, latitude);
    statusCode = 200;

    if (typeof resBody.error !== 'undefined') {
      aipError = new APIError(
        500,
        'Internal server error',
        'Internal server error. Exception thrown while determining temerature and humidity.',
      );
      statusCode = aipError.status;
      resBody = aipError;
    }

    response.status = statusCode;
    response.json = resBody;
  } else {
    aipError = new APIError(
      400,
      'Bad request, probably invalid headers',
      'Bad request, probably invalid headers. Longitude or latitude value. Valid values of LONGITUDE should be between -180 to 180 and LATITUDE should be between -90 and 90',
    );
    response.status = aipError.status;
    response.json = aipError;
  }

  return response;
};

export default (req, res) => {
  const { longitude, latitude } = req.headers;
  const { status, json } = deterimineResponse(longitude, latitude);
  res.status(status);
  res.json(json);
};
