export const numberWithCommas = (x) => {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};

export const progress = () => {
  return Math.floor(Math.random() * 90) + 10 + "%";
};

export const percentageCalc = (num, total) => {
  return ((num / total) * 100).toFixed(0);
};

export const compareArrays = (arr1, arr2) => {
  if (arr1 && arr2) {
    return arr1.some((r) => arr2.includes(r));
  } else {
    return false;
  }
};

// capitalize first letter
export const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// function to ellipsis text after 40 characters
export const ellipsisText = (text) => {
  if (text.length > 40) {
    return text.substring(0, 60) + "...";
  } else {
    return text;
  }
};

// currency
export const formatMoneyWithCommas = (money) => {
  const num = Number(money);

  if (isNaN(num))
    return '-';
  
  const str = (num > 0 ? num : -1 * num).toFixed(2)
  .replace(/\B(?=(\d{3})+(?!\d))/g, ',');


  if (num > 0) {
    return `$${str}`;
  }

  if (num < 0) {
    return `-$${str}`;
  }

  return '-'
}