export const formatNumber = (
  num: number,
  options: { showSymbol: boolean } = { showSymbol: true },
) => {
  return (
    (options.showSymbol ? '₦' : '') + num.toLocaleString(undefined, { minimumFractionDigits: 2 })
  );
};

export const formatCardNumber = (num: string) => {
  return '****' + num.slice(4, 7);
};
