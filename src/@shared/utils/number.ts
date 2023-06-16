import BigNumber from "bignumber.js";

export function bigNumber(amount: string | number | BigNumber) {
  return new BigNumber(amount);
}

export function numberValidCheck(value: string) {
  const regex = new RegExp(/^\d*[.]?\d*$/g);
  return regex.test(value);
}

export function decimalConverterWithpad(amount: string, decimal: number = 18) {
  const isDecimals = amount.includes(".");
  const [integer, decimals] = amount?.split(".");

  if (bigNumber(amount).eq("0") || !amount)
    return "0.".padEnd(decimal + 2, "0");

  return isDecimals
    ? [
        integer.slice(0, 59),
        decimals.slice(0, decimal).padEnd(decimal, "0"),
      ].join(decimal === 0 ? "" : ".")
    : amount.slice(0, 59) + ".".padEnd(decimal + 1, "0");
}

export function decimalConverter(amount: string, decimal: number = 18) {
  const isDecimals = amount.includes(".");
  const [integer, decimals] = amount?.split(".");

  return isDecimals
    ? [integer.slice(0, 59), decimals.slice(0, decimal)].join(
        decimal === 0 ? "" : "."
      )
    : amount.slice(0, 59);
}

export function numberFormat(value: number | string, digits: number = 0) {
  const nextValue =
    // eslint-disable-next-line
    typeof value === "string" ? value.replace(/\,/g, "") : value;

  const bnValue = bigNumber(nextValue);

  if (bnValue.isNaN()) {
    return "";
  }

  return decimalConverterWithpad(bnValue.toString(), digits);
}
export function numberFormatComma(value?: number | string, digits: number = 0) {
  if (!value) return;
  const nextValue =
    typeof value === "string" ? value.replace(/\,/g, "") : value;

  const bnValue = bigNumber(nextValue);

  if (bnValue.isNaN()) {
    return "";
  }

  const parts = bnValue.toString().split(".");

  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const decimalParts = decimalConverter(parts.join("."), digits);

  return decimalParts?.slice(-1) === ","
    ? decimalParts.substring(0, decimalParts.length - 1)
    : decimalParts;
}
