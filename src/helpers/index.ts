export const formatNumber = (
  num: number,
  options: { showSymbol: boolean } = { showSymbol: true },
) => {
  return (
    (options.showSymbol ? '₦' : '') + num.toLocaleString(undefined, { minimumFractionDigits: 2 })
  );
};
