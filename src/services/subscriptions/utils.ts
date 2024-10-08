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
      1: 13000,
      3: 37500,
      6: 72000,
      12: 138000,
    },
    set: {
      1: 4500,
      3: 12000,
      6: 22500,
      12: 45000,
    },
  };

  const formatter = new Intl.NumberFormat("uk-UA", {
    useGrouping: true,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const sum = bottlesMap[bottles][months];
  const month = sum / months;
  return {
    sum: sum >= 10000 ? formatter.format(sum) : sum,
    month,
  };
};
