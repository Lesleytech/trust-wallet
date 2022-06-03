export const formatNumber = (num: number) =>
  num.toLocaleString(undefined, { minimumFractionDigits: 2 });
