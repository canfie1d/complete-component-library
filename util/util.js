export const phoneNumberRegEx = /^(([0-9]){10})$/;
export const postalCodeRegEx = /^[0-9]{5}(?:-[0-9]{4})?$/;

export const toMoneyString = (money, divideBy100 = true) => {
  let moneyString = divideBy100 ? (money / 100.0).toFixed(2) : money.toFixed(2);
  if (moneyString < 0) return `-$${(-1 * moneyString).toFixed(2)}`;
  if (isNaN(moneyString)) return '$0';
  return `$${moneyString}`;
};

export const convertMilitaryTime = (time) => {
  if (time === null) return;
  const { h, m } = time;

  const mins = m.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  if (h > 12) {
    return `${h - 12}:${mins} pm`;
  } else {
    if (h === 0) {
      return `12:${mins} am`;
    } else {
      return `${h}:${mins} am`;
    }
  }
};

export const formatPhoneNumber = (number) => {
  if (number.match(/[^\d]/)) return number;
  if (number === '') return;
  const match = number.match(/^(\d{3})?(\d{3})?(\d{4})?/);
  let formattedPhoneNumber = '';
  formattedPhoneNumber +=
    '(' + (typeof match[1] != 'undefined' ? match[1] : number) + ') ';
  formattedPhoneNumber +=
    typeof match[2] != 'undefined' ? match[2] + '-' : number.slice(3);
  formattedPhoneNumber +=
    typeof match[3] != 'undefined' ? match[3] : number.slice(6);
  return formattedPhoneNumber;
};

export const sortList = (sortType, filteredList) => {
  // sortType is an object with a sortBy string and a direction string
  if (sortType.direction === 'ascending') {
    return filteredList?.sort((itemA, itemB) => {
      if (itemA[sortType.sortBy] === '-') return 1;
      if (itemB[sortType.sortBy] === '-') return -1;
      if (itemA[sortType.sortBy] > itemB[sortType.sortBy]) return 1;
      if (itemA[sortType.sortBy] < itemB[sortType.sortBy]) return -1;
      return 0;
    });
  } else if (sortType.direction === 'descending') {
    return filteredList?.sort((itemA, itemB) => {
      if (itemA[sortType.sortBy] === '-') return 1;
      if (itemB[sortType.sortBy] === '-') return -1;
      if (itemA[sortType.sortBy] > itemB[sortType.sortBy]) return -1;
      if (itemA[sortType.sortBy] < itemB[sortType.sortBy]) return 1;
      return 0;
    });
  }
};

export const capitalize = (string) => {
  if (typeof string !== 'string') return '';
  return string
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
