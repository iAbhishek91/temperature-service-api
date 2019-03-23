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
