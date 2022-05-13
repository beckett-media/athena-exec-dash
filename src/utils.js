export const numberWithCommas = (x) => {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};

export const progress = () => {
  return Math.floor(Math.random() * 90) + 10 + "%";
};

export const percentageCalc = (num, total) => {
  return ((num / total) * 100).toFixed(2);
};

export const compareArrays = (arr1, arr2) => {
  if (arr1 && arr2) {
    return arr1.some((r) => arr2.includes(r));
  } else {
    return false;
  }
};
