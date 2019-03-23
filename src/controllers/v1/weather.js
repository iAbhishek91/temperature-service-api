import {
  tropicalRegionCode,
  arcticRegionCode,
  regionBwTropicalAndArcticCode,
  tropicalRegionConstraints,
  arcticRegionConstraints,
  regionBwTropicalAndArcticConstraints,
} from '../../constants';
import { valueBetween } from '../../util';

export const validateLongitude = longitude => Number(longitude) <= 180 && Number(longitude) >= -180;
export const validateLatitude = latitude => Number(latitude) <= 90 && Number(latitude) >= -90;
const calculateClimateRegion = (laitiude) => {
  if (laitiude <= 20 && laitiude >= -20) {
    return tropicalRegionCode;
  }

  if (
    (laitiude >= 45 && laitiude <= 90)
    || (laitiude >= -90 && laitiude <= -45)
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

export default (req, res) => {
  const { longitude, latitude } = req.headers;
  if (
    validateLongitude(longitude)
    && validateLatitude(latitude)
  ) {
    const resBody = calculateTemperatureHumidity(longitude, latitude);
    let statusCode = 200;

    if (typeof resBody.error !== 'undefined') statusCode = 400;

    res.status(statusCode).json(resBody);
  } else {
    res.status(400).json({
      error: `Invalid longitude or latitude value.
        Valid values of "LONGITUDE" should be between -180 to 180 and "LATITUDE" should be between -90 and 90`,
    });
  }
};
