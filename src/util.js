// eslint-disable-next-line import/prefer-default-export
export const valueBetween = (min, max) => {
  if (
    min < max
    && min >= 0 && min <= 100
    && max <= 100 && max >= 0
  ) {
    const random = Math.round(Math.random() * 100);
    const result = random % max; // 0 to max

    return result < min ? min : result;
  }
  return { error: 'invalid range' };
};
