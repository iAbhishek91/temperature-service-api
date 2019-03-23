export const tropicalRegionCode = 'HIGH';

export const arcticRegionCode = 'LOW';

export const regionBwTropicalAndArcticCode = 'MEDIUM';

export const tropicalRegionConstraints = {
  temperature: { min: 30, max: 55 },
  humidity: { min: 60, max: 90 },
};

export const arcticRegionConstraints = {
  temperature: { min: 0, max: 15 },
  humidity: { min: 0, max: 20 },
};

export const regionBwTropicalAndArcticConstraints = {
  temperature: { min: 10, max: 25 },
  humidity: { min: 10, max: 70 },
};

export const arcticLatitudeRange = {
  range1: { min: -90, max: -45 },
  range2: { min: 45, max: 90 },
};

export const tropicalLatitudeRange = {
  range1: { min: -20, max: 20 },
};
