const FormatToK = (value) => {
  if (typeof value !== "number") {
    throw new Error("Input must be a number");
  }

  if (value >= 1000) {
    return (value / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }

  return value.toString();
};

export default FormatToK;
