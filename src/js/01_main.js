function createNode(element) {
  return document.createElement(element);
}
function append(parent, el) {
  return parent.appendChild(el);
}

const millesec = getMillisecunds(90);
const objDate = getDate(millesec);

setMaxDate("date-input", date);
setMinDate("date-input", date);

console.log(getDate(millesec));

// functions

function changeDatePickerRange(days) {
  const millesec = getMillisecunds(days);
  const objDate = getDate(millesec);
  const date = `${objDate.year}-${objDate.month}-${objDate.days}`;
  return date;
}

function getDate(rangeDate) {
  const t = Date.now() + rangeDate,
    days = new Date(t).getDate(),
    month = new Date(t).getMonth() + 1,
    year = new Date(t).getFullYear();

  const date = `${year}-${getZero(month)}-${getZero(days)}`;

  return date;
}

function getZero(num) {
  if (num >= 0 && num < 10) {
    return "0" + num;
  } else {
    return num;
  }
}

function setMaxDate(selector, date) {
  document.getElementById(selector).setAttribute("max", date);
}
function setMinDate(selector, date) {
  document.getElementById(selector).setAttribute("min", date);
}

function getMillisecunds(days) {
  const mil = 1000 * 60 * 60 * 24 * days;
  return mil;
}
