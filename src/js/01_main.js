const maxDate = changeDatePickerRange(90);
const minDate = changeDatePickerRange(1);

setMaxDate("date-input", maxDate);
setMinDate("date-input", minDate);

/* ============= functions =============== */

function changeDatePickerRange(days) {
  const millesec = getMillisecunds(days);
  const date = getDate(millesec);
  return date;
}

function getDate(millisec) {
  const t = Date.now() + millisec,
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

// function createNode(element, className, message) {
//   const div = document.createElement(element);
//   div.classList.add(className);
//   div.textContent = message;
//   return div;
// }

// function append(parent, el) {
//   return parent.append(el);
// }
