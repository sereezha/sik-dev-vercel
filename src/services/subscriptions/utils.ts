export const getPrices = (bottles: number | string, months: number) => {
  const bottlesMap: Record<number | string, Record<number, number>> = {
    1: {
      1: 1900,
      3: 5400,
      6: 10200,
      12: 19200,
    },
    2: {
      1: 4900,
      3: 14400,
      6: 28200,
      12: 55200,
    },
    special: {
      1: 11000,
      3: 32400,
      6: 63000,
      12: 120000,
    },
  };

  const sum = bottlesMap[bottles][months];
  const month = sum / months;
  return {
    sum,
    month,
  };
};
