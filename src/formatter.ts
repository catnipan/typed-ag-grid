type Formatter<T> = (params: { value: T | null | undefined }) => string;

export const USDFormatter: Formatter<number> = ({ value }) => {
  return (
    value?.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    }) ?? ""
  );
};

export const CapitalizedFormatter: Formatter<string> = ({ value }) => {
  if (value === null || value === undefined) {
    return "";
  }
  return value.charAt(0).toUpperCase() + value.slice(1);
};
